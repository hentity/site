---
title: "Minimax: How AI thinks about winning"
category: "Tech"
date: "2024-11-13"
coverImage: "/img/minimax/shawshank.jpeg"
description: "Since Garry Kasparov's loss to chess computer Deep Blue in 1997, AI superiority over humans in strategy games has become an accepted reality. But what makes them so damn good? Currently there is no one-size-fits-all answer, but a trick employed by many strategy bots is the concept of minimax."
isNew: "False"
---

Since chess champion Garry Kasparov's loss to the computer [Deep Blue](<https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)>) in 1997, AI superiority over humans in strategy games has been an increasingly accepted reality. Checkers (1956), chess (1997), Scrabble (2005), Go (2016), Poker (2017) and StarCraft (2019) have fallen like dominoes (which AI is incidentally yet to crack) before the silicon onslaught. Though more [general](https://en.wikipedia.org/wiki/Artificial_general_intelligence) reasoning has proven elusive for computers, in narrow domains with simple rules AI consistently outstrips our own biologically-endowed abilities to strategise, plan and win.

So, what makes them so damn good? At the time of writing, there is no one-size-fits-all answer. A chess-playing AI thinks deterministically and cannot rely on deception, while a poker AI works in probabilities and will bluff when it needs to. However, a trick employed across many of these systems is the concept of **minimax**.

### What is minimax?

Broadly, minimax can be thought of as a decision-making approach that prioritises the action that leads to the best _guaranteed_ outcome. It is [Murphy's Law](https://en.wikipedia.org/wiki/Murphy%27s_law) applied to game theory, acting on the assumption that the worst will happen. More formally, it tries to _minimise_ the _maximum_ possible loss - hence minimax.

An an example, imagine you are serving a five-year prison sentence. Under the pretence of carving a chess set, you have managed to obtain a rock hammer. You calculate that using the hammer, you should be able to tunnel to freedom within a year, hiding the tunnel entrance behind a poster in your cell. However, if the warden at any point decides to check behind the poster and discovers your escape attempt, your sentence will be increased to twenty years.

We can represent this scenario in a [payoff table](https://en.wikipedia.org/wiki/Normal-form_game):

|                     | Warden checks poster | Warden doesn't check poster |
| ------------------- | -------------------- | --------------------------- |
| **Start digging**   | 20 years             | 1 year                      |
| **Serve your time** | 5 years              | 5 years                     |

Would you dig the tunnel? It would certainly make for a [better story](https://en.wikipedia.org/wiki/The_Shawshank_Redemption), but comes with a lot of risk. This isn't an easy decision, and there are many ways to go about making it.

Using a minimax approach however, the choice is clear. Assuming the worst, if you attempt escape you will be caught and remain in prison for twenty long years. On the other hand, if you decide to serve your time you will be released after just five. In this scenario, an [agent](https://en.wikipedia.org/wiki/Intelligent_agent) following a minimax strategy will **not** attempt escape.

### Multiplayer minimax

Simple enough, right? Next, we'll talk about how this strategy is used so effectively in multiplayer games using a more abstract example.

Consider a [sequential](https://en.wikipedia.org/wiki/Sequential_game), two player game where players choose between two actions on each turn - left and right. The sequence of actions the players make throughout the game determines the final score. One player, who we'll call Max, wants to maximise this score. The other player, Minnie, wants to minimise it.

A weird game for sure, but it ends up simplifying things nicely. Possible outcomes can be drawn as a [decision tree](https://en.wikipedia.org/wiki/Decision_tree) , where each level of the tree represents a turn and each node is a possible game state. Branches represent player actions (left or right) in each game state, and final scores are shown at the bottom of the tree.

![Tree 1](/img/minimax/minimax_tree1.png)

If Max goes left hoping for a score of 5, Minnie can go right to get a score of -4. If Max goes left instead, the lowest possible score is 1. So using a minimax approach, Max should go right as his opening move.

Lets take a look at a slightly longer game.

![Tree 2](/img/minimax/minimax_tree2.png)

Notice that the space of possible games grows exponentially with each additional turn. You can probably still find Max's best opening move here, but it takes a bit more thought this time. Can we find an algorithmic approach, and leave this tedious business to the computers?

### Getting systematic

We can start by noticing that there are some final states that will never be reached. On his second turn, Max will never choose an action that leads to a lower score. This allows us to eliminate some nodes from the tree.

![Tree 1](/img/minimax/minimax_tree3.png)

Knowing this, Minnie will choose her action based on the actions that she predicts Max will choose. We can thinking of this as passing the maximum score from each pair in the third layer up to the second layer.

![Tree 1](/img/minimax/minimax_tree4.png)

Using these values, we can apply the same logic to eliminate actions that Minnie will not choose, and pass scores to the first layer.

![Tree 1](/img/minimax/minimax_tree5.png)

Max's choice is now clear. He will go left to achieve a maximum guaranteed score of one.

### The minimax algorithm

Generalising this process to a game where players choose from an arbitrary number of actions on each turn, we can derive a basic minimax algorithm! Here is a recursive implementation in python.

```python
def minimax(node, maximizing_player):
	# if node represents a final
	# game state, return the score
	if node.is_leaf():
		return node.get_score()

	# maximising player chooses the child
	# node (action) with the maximum score
	if maximizing_player:
		value = float("-inf")
		for child in node.get_children():
			value = max(value, minimax(child, False))
		return value

	# minimising player chooses the child
	# node (action) with the minimum score
	else:
		value = float("inf")
		for child in node.get_children():
			value = min(value, minimax(child, True))
		return value
```

### Limitations

Minimax has a time complexity of $O(b^d)$, where $b$ is the branching factor (number of possible actions per turn) and $d$ is the search depth. This exponential growth makes deep searches extremely costly without optimisation.

This said, the naive algorithm can be used effectively for a variety of turn-based, [perfect information](https://en.wikipedia.org/wiki/Perfect_information) games. Without much modification, it can serve as the brains for an unbeatable [tic-tac-toe agent](https://www.neverstopbuilding.com/blog/minimax) and even put up a decent fight in [chess](https://www.youtube.com/watch?v=U4ogK0MIzqk&ab_channel=SebastianLague).

### Taking it further

Of course, there are many ways we can improve the core algorithm and adapt it to new tasks. Minimax can be optimised with [alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning), deal with uncertainty using [expectiminimax](https://en.wikipedia.org/wiki/Expectiminimax), or pair up with [reinforcement learning](https://en.wikipedia.org/wiki/AlphaZero) to peer beyond the search tree. Maybe I'll even get around to posting about some of these eventually.

For now though, that's a wrap on minimax!
