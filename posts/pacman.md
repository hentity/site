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

See the full rules [here](https://ai.berkeley.edu/contest.html).

### Where to begin?

There are many ways to go about teaching a computer to play a game like this. Following a common approach in classical [AI planning](https://en.wikipedia.org/wiki/Automated_planning_and_scheduling), I will break the problem down as follows:

1. Define actions (in our case up, down, left and right) that the agent can take in a game state, and a [transition function](https://en.wikipedia.org/wiki/Transition_system) that models how the game state changes when an agent chooses an action.
2. Create an [evaluation function](https://en.wikipedia.org/wiki/Evaluation_function) to judge the desirability of a game state. The function should return a value which is higher for 'better' game states (e.g. if the team has a higher score than the opponent team) and lower for worse ones.
3. Using (1) and (2), devise a search algorithm which explores possible continuations from the current game state and chooses the best action to take.

To illustrate how this works, consider the following example.

![Example 1a](/img/pacman/example-1a.png)
