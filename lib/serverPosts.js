// matter is a library that let's you parse the metadata in each markdown file.
// the lib folder does not have an assigned name like the pages folder, so you can name it anything. It's usually convention to use lib or utils

import fs from 'fs'
import path from 'path'

// Import 'gray-matter', library for parsing the metadata in each markdown file
import matter from 'gray-matter'

// Import 'remark', library for rendering markdown
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import rehypeExternalLinks from 'rehype-external-links';
import python from 'highlight.js/lib/languages/python';


// --------------------------------
// GET THE PATH OF THE POSTS FOLDER
const postsDirectory = path.join(process.cwd(), 'posts') // process.cwd() returns the absolute path of the current working directory

// -------------------------------------------------
// GET THE DATA OF ALL POSTS IN SORTED ORDER BY DATE
/*
  Returns an array that looks like this:
  [
    {
      id: 'ssg-ssr',
      title: 'When to Use Static Generation v.s. Server-side Rendering',
      date: '2020-01-01'
    },
    {
      id: 'pre-rendering',
      title: 'Two Forms of Pre-rendering',
      date: '2020-01-02'
    }
  ]
*/

export async function getSortedPostsData(page = 1, selectedCategory = null) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Get the data from each file
  let allPostsData = fileNames.map((filename) => {
    // Remove ".md" from file name to get id
    const id = filename.replace(/\.md$/, '');
    
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8'); // .md string content
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Combine the data with the id
    return {
      id,
      ...(matterResult.data),
    };
  });

  // Filter posts by category if selectedCategory is not null
  if (selectedCategory && !(selectedCategory == "All")) {
    allPostsData = allPostsData.filter(post => post.category === selectedCategory);
  }
  
  // Sort posts by date
  allPostsData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Calculate start and end index for pagination
  const limit = 16; 
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  // Get posts for the current page
  const paginatedPosts = allPostsData.slice(startIndex, endIndex);
  
  return paginatedPosts;
}

  
  // ------------------------------------------------
  // GET THE IDs OF ALL POSTS FOR THE DYNAMIC ROUTING
  /*
    Returns an array that looks like this:
    [
      {
        params: {
          id: 'ssg-ssr'
        }
      },
      {
        params: {
          id: 'pre-rendering'
        }
      }
    ]
    */
  
  export async function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
  
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      }
    })
  }
  
  // The returned array must have the params key otherwise `getStaticPaths` will fail
  
  // --------------------------------
  // GET THE DATA OF A SINGLE POST FROM THE ID
  export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Use remark and rehype to process the markdown
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)                // Add remark-gfm for table support
      .use(remarkMath)               // Add remark-math for LaTeX
      .use(remarkRehype)
      .use(rehypeKatex)              // Add rehype-katex for LaTeX rendering
      .use(rehypeHighlight, { languages: { python } })
      .use(rehypeExternalLinks, {    // Add rehype-external-links to modify external links
        target: '_blank',
        rel: ['noopener', 'noreferrer']
      })
      .use(rehypeStringify)
      .process(matterResult.content);
  
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id and return
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  }
