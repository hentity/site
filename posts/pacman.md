---
title: "Beating pacman with search"
category: "Tech"
date: "2024-11-13"
coverImage: "/img/pacman/cover.png"
description: "I'm terrible at video games. Can an exploration into AI planning and search bump my stats? In this project, I attempt to build a halfway decent pacman capture the flag player with python and a few AI planning tricks."
isNew: "False"
---

I've never been any good at video games. Quick reflexes, precise inputs and trash talk just don't seem to be my thing. Luckily, as a programmer I can choose to delegate these skills to my computer (minus the trash talk, [for now](https://lowtech.ai/sebastian-gonzalez/trash-talker)). In this project, I plan to do exactly that. Using some AI planning techiques I picked up recently at uni, plus [Berkeley's python implementation](https://ai.berkeley.edu/contest.html) of Pacman Capture-the-Flag, my goal is to create an agent that can beat me, or at least put up a decent fight.

### Pacman Capture-the-Flag

The game is a multiplayer, capture-the-flag variant of pacman, where agents control both pacman and ghosts in coordinated team-based strategies. Your team will try to eat the food on the far side of the map, while defending the food on your home side.

![Intro Image](/img/pacman/intro.png)

- On the home side your agents are ghosts and on the far side, pacmen.
- To eat enemy food, an agent needs to bring it back to home territory. If a pacman is caught by a ghost in enemy territory, it will drop the food it is currently carrying and respawn deep in its own territory.
- The first team to capture all enemy food wins. To reduce stalemates, the team with the most food after a timeout will also win.
- Enemy agents are only visible within a small 5-step radius

See the full rules [here](https://ai.berkeley.edu/contest.html).

### Where to begin?

There are many ways to go about teaching a computer to play a game like this. Following a common approach in classical [AI planning](https://en.wikipedia.org/wiki/Automated_planning_and_scheduling), I will break the problem down as follows:

1. Define **actions** (in our case up, down, left and right) that the agent can take in a game state, and a [**transition function**](https://en.wikipedia.org/wiki/Transition_system) that models how the game state changes when an agent chooses an action from a given state.
2. Create an [**evaluation function**](https://en.wikipedia.org/wiki/Evaluation_function) to judge the desirability of a game state. The function should return a value which is higher for 'better' game states (e.g. if the team has a higher score than the opponent team) and lower for worse ones.
3. Using (1) and (2), devise a **search algorithm** which explores possible continuations from the current game state and chooses the best action to take.

Lets illustrate this using an example, with a search depth of 1 (we only look one action into the future). For the moment, we will assume there is only one player.

![Example 1a](/img/pacman/example-1a.png)

In the starting state, the pacman agent has only one option: go right.

![Example 1b](/img/pacman/example-1b.png)

From here, the search algorithm (at depth 1) has two future states to explore, resulting from the actions left and right. Using a simple evaluation function that simply counts the the amount of food that has been collected in a given state, the state after going right is given a higher score. Therefore, the agent will move right again and collect the food.

![Example 1c](/img/pacman/example-1c.png)

Note that from here, the agent cannot return to the previous states as the food has been removed.

### Getting graphic

If you've used [graphs](<https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)>) before (the discrete math variety), you might see how they could be useful here. We can represent each game state as a node in a [directed graph](https://en.wikipedia.org/wiki/Directed_graph), using the evaluation at each node to conduct a search through [state space](<https://en.wikipedia.org/wiki/State_space_(computer_science)>), finding the most desirable states and the shortest sequence of actions to get there.

The example above can be represented as a graph, with the initial state indicated by a diamond.

![Example 2a](/img/pacman/example-2a.png)

Converting to this form is useful because people have been thinking about and using graphs for a [long time](https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg). Once we've modelled pacman as a graph, we can take advantage of well-known search algorithms and techniques to [abstract away](<https://en.wikipedia.org/wiki/Abstraction_(computer_science)>) a lot of the finicky details.

To build our graph from the initial state we will need:

1. A way of finding legal moves from a given game state.
2. A transition function that, given an input state and an action, generates the resulting state.

Fortunately, these are implemented by the `getLegalActions` and `generateSuccessor` function respectively in Berkeley's base code.

### Evaluation

Before we get going with search, lets take a moment to construct a basic evaluation function. This function should take in a game state and return some number indicating the desirability of that state. These outputs will then be used as node values when searching through our graph. We'll start with a purely offensive agent, and worry about defense later. For a simple evaluation function, we'll work off the following requirements:

- When the agent is in its home territory, the evalutation should reward states that are closer to enemy territory
- When the agent isn't carrying any food, or food is closer than home territory, the evaluation should reward states where the agent is closer to food.
- When the agent is carrying some food and the boundary is closer than the nearest food, the evaluation should reward states that are closer to home territory.

Because this evaluation function will be used as part of a search function, we also need to account for the search depth and make sure that we are using distances from the root state to switch between our evaluation formulas.

Here's a simplified version of this in python.

```python
def evaluateState(searchState, rootState, depth):
    if agent.isHome():
        return -depth - searchState.getEnemyDistance()   # Reward moving toward enemy territory
    else if agent.carryingFood() == 0 or rootState.getFoodDistance() < rootState.getHomeDistance():
        return -depth - searchState.getFoodDistance  # Reward moving toward food
    else:
        return -depth - searchState.getHomeDistance  # Reward moving toward home
```

This also indirectly incentivises avoiding capture, as the agent is sent back to the starting position (far from food or the boundary) when captured.

### Search

With an evaluation function in place, we can now devise a search algorithm to help our agent plan its actions. I used a [minimax](https://en.wikipedia.org/wiki/Minimax) algorithm augmented with [Upper Confidence Bound for Trees](https://www.chessprogramming.org/UCT) (UCT) to handle decision-making under uncertainty. Here's how it works in the context of Pacman Capture-the-Flag:

- Minimax explores possible moves for both our agent (the "maximizing player") and the opponent (the "minimizing player"). It assumes that the opponent will always act to minimize our agent's score while our agent tries to maximize it. The search alternates between these perspectives at each depth. If you're curious, I made a [seperate post](https://henlightened.com/minimax) about this.
- Since exploring every possible move at deeper levels can quickly become computationally expensive, UCB provides a way to balance exploration (searching more paths, even less promising ones) with exploitation (focusing on known high-evaluation paths).

To speed up the search, we also avoid paths where the agent revisits locations and use [alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) to discard paths that definitely aren't worth exploring further.

Here's a high-level implementation of the search function in Python. This was generalised to work with n maximising players and n minimising players in the final implementation:

```python
def minimax_with_ucb(state, depth, is_maximizing_player, ucb_constant=1.41):
    # base case: return evaluation if depth is 0 or state is terminal
    if depth == 0 or state.is_terminal():
        return evaluateState(state)

    legal_actions = state.getLegalActions()
    # handle case with no legal actions
    if not legal_actions:
        return evaluateState(state)

    if is_maximizing_player:
        best_value = float('-inf')  # maximize value
        for action in legal_actions:
            successor = state.generateSuccessor(action)  # get next state
            value = minimax_with_ucb(successor, depth - 1, False, ucb_constant)  # recursive call
            ucb_value = value + ucb_constant * (len(legal_actions) / (1 + state.getVisitCount(action)))**0.5  # UCB formula
            best_value = max(best_value, ucb_value)  # update best value
        return best_value
    else:
        worst_value = float('inf')  # minimize value
        for action in legal_actions:
            successor = state.generateSuccessor(action)  # get next state
            value = minimax_with_ucb(successor, depth - 1, True, ucb_constant)  # recursive call
            worst_value = min(worst_value, value)  # update worst value
        return worst_value
```

UCB helps to handle the search space explosion, while minimax allows the agent to execute precise, no-risk move sequences. A similar defensive version of the bot was also developed.

### Testing the bot

In its [final implementation](https://github.com/COMP90054-2023s2/a3-team_39), the bot was able to evaluate tens of thousands of game states per second and searched up to 30 moves ahead on each turn (depending on how open the map was). The bot took the most efficient paths to find food, and often surprised me with clever interceptions and close escapes. Had I done it? Was there a light at the end of the tunnel for my gaming performance?

Unfortunately, the answer remains a resounding no. Although the bot could draw on orders of magnitude more compute than my own biological hardware, it was fundamentally limited by (1) its limited long-term planning and (2) its inability to learn.

1. As the search space is far too large to see all the way to the end of the game, the bot was limited to using an evaluation of the game state at most 30 moves ahead. While this was successful for close-quarter evasions and short expeditions for food, it was insufficient for long term strategy. For example, if I hung around out of range of the bot's visibility, it would often get greedy and venture deep into my territory for food before returning home. This meant that it was easy to lure into confined spaces where it was susceptible to ambush.
2. The bot also lacked something that humans excel at: learning. It had no ability to adapt its approach based on my playstyle, leaving it vulnerable to exploitation. For example, if I consistently lured it into ambushes, it failed to adjust its strategy to counter my tactics. By contrast, humans can intuitively recognize patterns in their opponent's behavior and adapt their strategies accordingly, giving them a huge advantage against rigid, heuristic evaluation functions.

### Hope?

One way to address both of these issues would be to leverage Reinforcement Learning (RL). Unlike a handcrafted evaluation function like the one above, which relies on predefined heuristics, RL enables agents to learn complex evaluation functions directly from experience. This approach was used to great success by Google DeepMind in their groundbreaking work on [AlphaZero](https://deepmind.google/discover/blog/alphazero-shedding-new-light-on-chess-shogi-and-go/), which dominated existing techniques in games like Chess and Go.

An RL-trained agent would combine search with a neural network that learns to evaluate game states and predict the most promising actions. By training over millions of games, the neural network implicitly learns to value long-term outcomes over immediate gains. For example, AlphaZero developed an uncanny ability to "sacrifice" material in chess to gain positional advantages that paid off many moves later. Through self-play, RL agents continuously also learn to counter diverse strategies. This would allow a Pacman bot to recognize and respond to patterns in an opponent's playstyle, making it harder to exploit.

Maybe I'll get around to building this some day. I'll have to learn to live with my sub-par gaming abilities for now, but I learned enough along the way that this didn't feel like a complete waste of time :)
