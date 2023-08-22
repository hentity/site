---
title: "My First Post"
date: "2020-01-01"
---

# This is my first post.

### This is a subheading

```import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors : {
      'darkgrey' : '#303030',
      'medgrey' : '#969696',
      'lightgrey' : '#e5e5e5',
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
```

$(2x^2)$ math?

_A list perhaps_

- element one
- element twoooo
- elementwedfsjdf

What about some `inline` code?
