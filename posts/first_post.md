---
title: "Decoding the Human Genome: What Our DNA Tells Us About Ourselves"
category: "Tech"
date: "2020-01-01"
coverImage: "/img/test.jpg"
description: "A brief description of the post, to be displayed when it is previewed. Shouldn't be more than a couple of sentences."
isNew: "False"
---

What if we just jump straight into some text?

This is a longer paragraph to see what that looks like with different fonts. It should wrap over a couple of lines and represent a digestible chunk of information for the reader.

### Clear code: the good and the bad

The “power” of clear code, for better or for worse, was made fully clear to me after a certain incident at work.

I once wrote a data enrichment module in C++, a language that is generally harder to read compared to other languages simply due to its verbosity.

I started with just two files (.h/.cpp) and all the implementation code went into just these two files.

The result was this giant, disgusting piece of spaghetti on the inside, but a perfectly working program on the outside.

This would never get past code review.

```python
from random import randrange
from termcolor import colored
import datetime

answer = " "
LOW_BOUND = datetime.date(1700, 1, 1)
UPPER_BOUND = datetime.date(2499, 12, 31)
time_between = UPPER_BOUND - LOW_BOUND
DAYS_BETWEEN = time_between.days

weekdays = ["monday", "tuesday", "wednesday", "thursday",
            "friday", "saturday", "sunday"]

total_correct = 0
total = 0

while answer:
    random_number_of_days = randrange(DAYS_BETWEEN)
    rdate = LOW_BOUND + datetime.timedelta(days=random_number_of_days)
    answer = input(f"{rdate.day}/{rdate.month}/{rdate.year}\n")
    if answer == "x":
        print(f"score: {total_correct}/{total}")
        break
    if answer == weekdays[rdate.weekday()]:
        total_correct += 1
        total += 1
        print(colored('yep', 'green'))
    else:
        total += 1
        print(colored(f'nope, {weekdays[rdate.weekday()]}', 'red'))

```

$(2x^2)$ math?

_A list perhaps_

- element one
- element twoooo
- elementwedfsjdf

What about some `inline` code?
