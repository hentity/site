---
title: "Teaching myself bioinformatics from scratch: A plan"
series: "Bioinformatics from Scratch"
category: "Biology"
date: "2026-03-30"
coverImage: "/img/bfs_1/cover.png"
description: "The first post in a series documenting an attempt to teach myself bioinformatics in my spare time. I cover why the field appeals to me, what I'm hoping to get out of it, and the plan: five weeks across five subfields before committing to one."
isNew: "True"
---

This is the first post in what will hopefully become a series documenting my attempt to teach myself bioinformatics in my spare time. I'm a 9-to-5 software developer in my mid-twenties with relatively few responsibilities, and thought this might be a good way to spend my free time before life gets too busy.

I've been into computers and biology for as long as I can remember, and for most of my life those felt like separate things. When it came to picking a degree I went with computer science, and somewhere in the back of my head I think I filed biology away as the road not taken. It wasn't until my final year that I stumbled into a computational genomics elective and realised an overlap between my interests had existed the whole time. After graduating I did a [bioinformatics specialisation](https://www.coursera.org/specializations/bioinformatics) through UC San Diego to go a bit deeper, and by the end of that I was pretty sure this was something I wanted to pursue.

---

## Why bioinformatics?

There are a few reasons, and I'll try to separate them out.

The first is that so much of biology is still genuinely unsolved. Not just "we haven't found the cure yet" unsolved. More like "we don't have the tools to even describe what's happening" unsolved. That might sound like a reason to pick a different field, but I find it kind of exciting. Take the idea of simulating just a single living [cell](https://en.wikipedia.org/wiki/Cell_(biology)). We can't do it — not even close. We've mapped a lot of the individual [pathways](https://en.wikipedia.org/wiki/Biological_pathway), and what we've managed to figure out through clever experimental design is genuinely impressive. But the full picture remains almost entirely out of reach. I think there's something appealing about a field where so much is still on the table.

The second thing is harder to articulate but I'll try. Inside a cell, the fundamental interactions are largely mechanical. Molecules [diffuse](https://en.wikipedia.org/wiki/Brownian_motion) around, bump into each other, bind when the geometry is right. At that level it's just physics. But layer enough of those interactions on top of each other and something strange happens: you get behaviour that starts to look purposeful. [Chemotaxis](https://en.wikipedia.org/wiki/Chemotaxis) is a good example. Receptor proteins in the cell membrane detect a slightly higher concentration of a signalling molecule on one side. That triggers a cascade of protein interactions inside the cell, which eventually causes the [cytoskeleton](https://en.wikipedia.org/wiki/Cytoskeleton) to reorganise and push the membrane forward. The cell crawls toward the signal. No brain involved, no central coordinator. A chain of molecular collisions adds up to something that looks a lot like navigation. At some point, enough of these molecular interactions start to cross a fuzzy line into what we'd recognise as being 'alive', which to me is nothing other than magical.

![Emergence](/img/bfs_1/emergence.png)

The third reason is more practical: computation seems like a natural fit for this kind of problem. Biology generates enormous amounts of data: genomic sequences, protein structures, gene expression measurements across thousands of cells at once. And it appears that research efforts might benefit from the kind of pattern recognition, statistical modelling, and algorithmic thinking drilled into computer people like myself.

Finally, the applications aren't abstract. Better models of disease, better drug targets, better understanding of what goes wrong and why in real patients. That feels worth working on.

---

## First things first: Choosing a subfield

[Bioinformatics](https://en.wikipedia.org/wiki/Bioinformatics) is a big field. There are subfields within it that have their own distinct biological context, their own tooling, their own research communities, their own datasets. Picking it up as an outsider without narrowing your focus is probably a good way to spread yourself thin and not really get anywhere.

So the first thing I want to do is pick a subfield. I'll spend a week on each of the five areas below. If you work in these fields, please forgive any butchered descriptions. 

- [Single-cell genomics](https://en.wikipedia.org/wiki/Single-cell_sequencing): measuring gene activity at the resolution of individual cells, rather than averaging across a whole tissue
- [Spatial transcriptomics](https://en.wikipedia.org/wiki/Spatial_transcriptomics): like single-cell genomics, but with the physical location of each cell preserved, so you can ask not just what genes are active but where in a tissue
- [Metagenomics](https://en.wikipedia.org/wiki/Metagenomics): sequencing genetic material directly from an environment (a soil sample, a gut microbiome) to characterise what organisms are present without culturing them first
- [Genomic variant interpretation](https://en.wikipedia.org/wiki/Variant_of_uncertain_significance): identifying differences in DNA sequences between individuals and figuring out what those differences mean, particularly in the context of disease
- [Protein function prediction](https://en.wikipedia.org/wiki/Protein_function_prediction): predicting what a protein does from its sequence or structure, a field that has seen a lot of ML activity recently, mostly in the wake of AlphaFold

The goal for each week is to get a reasonable sense of what the field is actually about. I'd like to get a grasp of its history, the landmark papers, the current state of research, the kinds of problems people are working on. I'll be reading papers, trying to actually understand them (starting from the abstract and working outwards as needed), and hopefully doing some hands-on analysis with public datasets where I can.

At the end of the five weeks I'll pick one and commit to it for a while. That whole process will be the subject of the next post in this series.

---

## After that

Once I've picked a subfield, I'll largely be playing it by ear. But I have a rough idea of what I want to do.

The main thing is to get as immersed in the literature as I can. That means grinding through papers, looking up every second word and slowly building up enough context that things start to become legible. I'd also like to get hands-on with real data. There are plenty of public datasets in most of these fields, and it seems like there'd be a lot of value in running or recreating analyses rather than just reading about them.

Beyond that, I'd like to try to make some contacts. Bioinformatics seems to have a reasonably active open science community and I'm hoping to find people willing to point a clueless outsider in the right direction.

The longer-term goal of contributing to actual research in some way is something I hold loosely. I don't have institutional affiliations and I'm doing this in my spare time, so I'm realistic about the constraints. But it's the direction I'm pointing in, and I'll see how far I get.

---

## A little about me

I have a masters in software engineering with a focus on AI/ML, I've done an introductory bioinformatics course, and I have high school biology. That's the full extent of my formal background here. I'm not affiliated with any research institution. I'm doing this in my spare time because I find it genuinely interesting and I want to see how far I can get.

I'll try to write about things honestly, including when I'm confused or wrong. The blog series is more a record of the learning process than it is a place to share findings.

If you work in any of these areas and have any advice on where a newcomer should focus their energy, I'd genuinely love to hear from you.
