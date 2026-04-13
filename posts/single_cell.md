---
title: "How much can I learn about single-cell genomics in a week?"
series: "Bioinformatics from Scratch"
category: "Biology"
date: "2026-04-13"
coverImage: "/img/single_cell/cover.png"
description: "The second post in a series documenting an attempt to teach myself bioinformatics in my spare time. I dive into the field of single-cell genomics to figure out what its all about - and if it would be any fun to study."
isNew: "True"
---

In my [first post](../posts/2026-03-31-bioinformatics-from-scratch-part-1.md) I wrote about my plan to explore each of the main bioinformatics subfields before deciding where to focus. Single-cell genomics is the first one I've dug into properly. I spent a week reading papers, going through analysis workflows, and trying to figure out what the field actually involves. This post is my amateur attempt to summarise what I found.

![Single Cell](/img/single_cell/single_cell.png)

## What is single-cell genomics?

The core idea is measuring [gene expression](https://en.wikipedia.org/wiki/Gene_expression) at the level of individual cells, rather than averaging across an entire tissue sample.

To understand why that distinction matters, it helps to know what gene expression actually is. All cells in your body contain the same DNA, but they can have vastly different characteristics (look a neuron vs a red blood cell for example). The difference comes down to which genes are switched on ('expressed') in each cell at any given moment, and are being actively converted from DNA -> RNA -> Proteins. We can measure which genes are being expressed by observing the [RNA](https://en.wikipedia.org/wiki/RNA) molecules that a cell is producing.

Before single-cell methods existed, the standard approach was [bulk RNA sequencing](https://en.wikipedia.org/wiki/RNA-Seq): you take a tissue sample, lyse (break open) all the cells together, and sequence the combined RNA. This gives you an averaged expression profile across all the cells in the sample. The problem is that tissues are not homogeneous. A tumour, for example, is a mixture of cancer cells, immune cells, blood vessel cells, and stromal cells. The average expression profile of that mixture tells you something, but it hides a lot. If a rare population of immune cells is behaving unusually, you might not see it in the bulk average at all.

[Single-cell RNA sequencing](https://en.wikipedia.org/wiki/Single-cell_sequencing) (scRNA-seq) solves this by measuring gene expression in each cell individually. Instead of one expression profile per sample, you get one per cell. You can then ask which cells are present, how many of each type, how they differ from each other, and how their expression changes in response to disease or treatment.

## What does a project in this field look like?

A concrete example: imagine you're studying why some patients with a particular cancer respond to [immunotherapy](https://en.wikipedia.org/wiki/Cancer_immunotherapy) and others don't. A single-cell genomics approach might involve taking tumour biopsies from responders and non-responders, profiling every cell in each biopsy, and looking for differences in the immune cell populations. Maybe responders have more of a particular type of T cell that is able to attack the tumour. Maybe non-responders have a subpopulation of cancer cells that is actively suppressing immune activity (I don't know man, I'm not a doctor). This kind of question is difficult or impossible to answer with bulk sequencing - you need single-cell resolution to see it.

The analysis pipeline for a project like this has several stages, and it starts in the lab before a single line of code is written.

Cells first need to be isolated and separated. The dominant approach uses [microfluidics](https://en.wikipedia.org/wiki/Microfluidics) to encapsulate individual cells in tiny oil droplets, each containing a unique [barcode](https://en.wikipedia.org/wiki/DNA_barcoding) that will later identify which cell each RNA molecule came from. The cell is then lysed inside the droplet, its RNA is captured and tagged with the barcode and a [UMI](https://en.wikipedia.org/wiki/Unique_molecular_identifier) (a short random sequence used to count individual molecules rather than PCR copies), and sequenced. The output of this process is a raw sequence file, which gets aligned to a reference genome to produce a *count matrix*: a table with one row per cell and one column per gene, where each value is the number of RNA molecules detected for that gene in that cell. A typical matrix might have 10,000 cells and 30,000 genes, and around 90% of the values are zero.

From the count matrix, the analysis proceeds through quality control (filtering out dead cells, empty droplets, and doublets), normalisation (accounting for cells that were sequenced to different depths), batch correction (removing technical variation between samples processed in different runs or labs), and then dimensionality reduction, where 30,000 gene dimensions get compressed into something manageable using methods like [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis) or [UMAP](https://en.wikipedia.org/wiki/Nonlinear_dimensionality_reduction#UMAP). If you've done any machine learning, your ears might prick up at this point. Finally, cells get clustered by similarity and annotated with cell type labels, and then the actual biological questions get asked.

By far the most helpful paper I came across was written in 2019 by Luecken and Theis: ["Current best practices in single-cell RNA-seq analysis"](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1716-1). It covers the state of the art for this pipeline at the time of writing. It's a little dated now, but from what I can gather the overall process hasn't changed too much. What struck me most reading it was how judgment-heavy the whole process is — there's no universal QC threshold that works for every dataset, no one normalisation method that is always best, no definitive way to know how many clusters to use. The paper's approach to quality control is deliberately iterative: start permissive, run the analysis, use the downstream results to decide if your QC was good enough, then adjust. Sensible enough, but it also opens the door to a form of data peeking where you keep adjusting until you get the results you want. The paper is explicit that this is a risk. It seems like the line between legitimate iteration and cherry-picking parameters is blurry, and navigating it requires experience.

A similarly thorny problem arises in one of the most basic analysis steps. After clustering cells, you typically identify the genes that define each cluster by running a statistical test comparing expression between clusters. But the clusters were defined by gene expression in the first place, so the statistical test's null hypothesis is violated by design. The p-values come out systematically too small. The paper acknowledges this and recommends treating marker gene results as exploratory rather than confirmatory.

Reading all of this left me with a real appreciation for how much careful, informed work goes into extracting anything trustworthy from scRNA-seq data. The data itself is noisy and sparse by nature. The methods are imperfect and often make assumptions that don't fully hold. And the analyst is making judgment calls at every stage, any one of which could quietly push the results in a particular direction. What impressed me about the Luecken and Theis paper was how seriously it takes all of this. It seems like a lot of the skill involved in this field is in meticulously seperating signal, noise and artefact.


## A timeline of the field

Single-cell RNA sequencing was first demonstrated in 2009 ([Tang et al.](https://www.nature.com/articles/nmeth.1315), *Nature Methods*), but it was slow and expensive and could only handle a handful of cells at a time.

A transformation came in 2015. Two papers published simultaneously in *Cell* ([*Drop-seq*](https://doi.org/10.1016/j.cell.2015.05.002) by Macosko et al. and [*InDrop*](https://doi.org/10.1016/j.cell.2015.04.044) by Klein et al.) introduced droplet microfluidics to scRNA-seq, enabling thousands of cells to be profiled in a single experiment. [10x Genomics](https://www.10xgenomics.com/products/single-cell-gene-expression) commercialised this approach in 2016 with the Chromium platform, which is now the industry standard. The Human Cell Atlas project, an international effort to map every cell type in the human body, was formally proposed in 2017.

From 2018 to 2020, tools for batch correction ([Harmony](https://github.com/immunogenomics/harmony), [scVI](https://scvi-tools.org/)), trajectory inference (RNA velocity, [scVelo](https://scvelo.readthedocs.io/en/stable/)), and multi-modal measurement ([CITE-seq](https://cite-seq.com/), which captures RNA and protein simultaneously) were developed and standardised. Luecken and Theis published their best-practices tutorial in 2019, marking a kind of coming-of-age for the field.

From 2021 onwards, spatial transcriptomics moved from niche to mainstream. Technologies like [10x Visium](https://www.10xgenomics.com/products/spatial-gene-expression) allow gene expression to be measured while preserving the physical location of cells within a tissue. The first major set of Human Cell Atlas deliverables appeared in 2022, a coordinated collection of around 50 papers covering multiple human organs. That same year, Perturb-seq at genome scale ([Replogle et al.](https://doi.org/10.1016/j.cell.2022.05.013), *Cell* 2022) made it possible to run [CRISPR](https://en.wikipedia.org/wiki/CRISPR) knockouts across every gene in the genome at single-cell resolution, opening a new class of experiment.

The most recent wave has been foundation models. [Geneformer](https://huggingface.co/ctheodoris/Geneformer) (2023) and [scGPT](https://github.com/bowang-lab/scGPT) (2024) apply transformer-based pretraining to single-cell data: each cell is treated as a "sentence," its expressed genes as "tokens," and the model is trained to predict masked gene expression values. To do this well, the model has to implicitly learn co-expression patterns, regulatory relationships, and cell type signatures. The result is a model that can be fine-tuned for tasks like cell type annotation, perturbation prediction, and gene regulatory network inference with relatively small labelled datasets. Whether these models are learning genuine biology or sophisticated pattern matching is contested, and interpretability is poor in the ways you'd expect from large language models. But they seem to be useful, and have been adopted quickly. 

Earlier this year, a paper in *Cell* mapped every cell type in an entire mouse body at single-cell resolution, producing a reference dataset of 59 million cells across 16 organ systems. They also trained a model capable of annotating cell and tissue types from standard histology images alone — the kind of images hospitals have been producing for over a century. The possibility of retroactively extracting single-cell-level information from existing clinical archives is striking.

The grand vision underlying much of this work is the Human Cell Atlas: a complete reference map of every cell type in the human body, with expression profiles, spatial locations, and relationships to adjacent cell types. Once that reference exists, disease states can be understood as deviations from it. Drug effects can be traced to specific cell populations. The field is working towards something that looks less like a database and more like a model of human biology at the cellular level. This is ridiclously cool, but it seems we are still a ways off. 

![Timeline](/img/single_cell/timeline.png)

## What might it be like to work in this field?

Single-cell genomics sits at the intersection of wet lab biology, statistics, and software engineering, which is both its appeal and its challenge.

On the computational side, the datasets are large, the analysis involves a lot of judgment, and keeping up with the tooling requires real effort. Python is increasingly the dominant language, built around the [Scanpy](https://scanpy.readthedocs.io/en/stable/) ecosystem, which integrates with a growing set of tools for spatial analysis, probabilistic modelling, and multi-omics.

The statistical demands are non-trivial. Many of the pitfalls I encountered reading the Luecken and Theis paper were statistical (violated null hypotheses, anti-conservative p-values, tension between iterative analysis and data peeking).

The upside is that the biological questions are genuinely compelling. Single-cell genomics is relevant to cancer, immunology, neuroscience, developmental biology, and drug development. 

Some challenges I can see: the field moves extremely fast; the analysis pipeline involves many judgment calls that take experience to navigate well; and the trade off between powerful ML methods and more interpretable heuristic ones is tricky.

## What good can be done in this field?
In oncology, understanding the cellular composition of tumours (which immune cell types are present, which are exhausted, which cancer cell subpopulations exist) has become clinically relevant. Tumour-infiltrating lymphocyte profiles correlate with immunotherapy response. Rare drug-resistant cell populations that survive treatment can be identified before relapse occurs.

In neuroscience, single-cell brain atlases have revealed a degree of cell type diversity that was previously invisible. The [Allen Brain Cell Atlas](https://brain-map.org/bkp/explore/abc-atlas) has mapped thousands of transcriptionally distinct cell types in the mouse brain. Understanding which types are affected in neurological disease is an active and open question.

In drug development, single-cell data can reveal off-target effects at cellular resolution: which cell types are affected by a compound beyond its intended target, and in what tissues. That kind of information is difficult to get any other way.

The longer-term potential, if the Human Cell Atlas project reaches something approaching completeness, is a reference map of human cell biology that could change how disease is understood and diagnosed. That's a large ambition and a long time horizon. But the rate of progress over the past decade suggests it's not unreasonable.
