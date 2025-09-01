import type { ChartConfig } from '@/components/ui/chart';

export const projects = [
  {
    title: 'Sentiment Analysis of Customer Reviews',
    description:
      'Developed a machine learning model to classify customer reviews as positive, negative, or neutral. Used NLTK and Scikit-learn.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Scikit-learn'],
    image: 'https://picsum.photos/600/400',
    imageHint: 'data analytics',
  },
  {
    title: 'Sales Forecasting with Time Series Analysis',
    description:
      'Utilized ARIMA and Prophet models to forecast future sales data for a retail company, improving inventory management.',
    tags: ['R', 'Time Series', 'Forecasting', 'Prophet'],
    image: 'https://picsum.photos/600/400',
    imageHint: 'business chart',
  },
  {
    title: 'Interactive Data Visualization Dashboard',
    description:
      'Built a web-based dashboard using Plotly Dash to visualize and explore a large dataset of global development indicators.',
    tags: ['Python', 'Dash', 'Plotly', 'Data Visualization'],
    image: 'https://picsum.photos/600/400',
    imageHint: 'dashboard interface',
  },
  {
    title: 'Image Classification with CNNs',
    description:
      'Trained a Convolutional Neural Network (CNN) with TensorFlow to classify images from the CIFAR-10 dataset with high accuracy.',
    tags: ['TensorFlow', 'Deep Learning', 'Computer Vision'],
    image: 'https://picsum.photos/600/400',
    imageHint: 'neural network',
  },
];

export const skills = [
  { name: 'Python', proficiency: 95, fill: 'var(--color-python)' },
  { name: 'R', proficiency: 80, fill: 'var(--color-r)' },
  { name: 'SQL', proficiency: 90, fill: 'var(--color-sql)' },
  { name: 'TensorFlow', proficiency: 85, fill: 'var(--color-tensorflow)' },
  { name: 'PyTorch', proficiency: 75, fill: 'var(--color-pytorch)' },
  { name: 'Scikit-learn', proficiency: 90, fill: 'var(--color-scikitlearn)' },
  { name: 'Tableau', proficiency: 80, fill: 'var(--color-tableau)' },
];

export const skillsChartConfig = {
  proficiency: {
    label: 'Proficiency',
  },
  python: {
    label: 'Python',
    color: 'hsl(var(--chart-1))',
  },
  r: {
    label: 'R',
    color: 'hsl(var(--chart-2))',
  },
  sql: {
    label: 'SQL',
    color: 'hsl(var(--chart-3))',
  },
  tensorflow: {
    label: 'TensorFlow',
    color: 'hsl(var(--chart-4))',
  },
  pytorch: {
    label: 'PyTorch',
    color: 'hsl(var(--chart-5))',
  },
  scikitlearn: {
    label: 'Scikit-learn',
    color: 'hsl(var(--chart-1))',
  },
  tableau: {
    label: 'Tableau',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export const blogPosts = [
  {
    slug: 'understanding-llms',
    title: 'A Beginner\'s Guide to Understanding Large Language Models',
    excerpt:
      'Diving deep into the architecture and magic behind models like GPT-4. We will explore the transformer architecture...',
    date: '2024-05-15',
    image: 'https://picsum.photos/600/400',
    imageHint: 'artificial intelligence',
    content: `
<p>Large Language Models (LLMs) are at the forefront of the AI revolution, but how do they actually work? In this post, we'll break down the core concepts behind these powerful tools.</p>
<h3 class="text-xl font-headline font-semibold mt-6 mb-4">The Transformer Architecture</h3>
<p>The magic behind most modern LLMs is the transformer architecture, introduced in the paper "Attention Is All You Need." Unlike previous models that processed text sequentially, transformers can process all parts of the input text simultaneously. This is achieved through a mechanism called "self-attention."</p>
<h3 class="text-xl font-headline font-semibold mt-6 mb-4">Self-Attention: The Core Idea</h3>
<p>Self-attention allows the model to weigh the importance of different words in the input text when processing a specific word. For example, when processing the word "it" in the sentence "The cat sat on the mat, and then it purred," the attention mechanism can learn to associate "it" strongly with "cat."</p>
<p class="mt-4">This ability to capture long-range dependencies and contextual relationships is what makes transformers so powerful for understanding and generating human-like text.</p>
`,
  },
  {
    slug: 'data-cleaning-importance',
    title: 'The Unsung Hero: Why Data Cleaning is the Most Important Step',
    excerpt:
      'Garbage in, garbage out. A look at why pristine data is the foundation of any successful data science project.',
    date: '2024-04-22',
    image: 'https://picsum.photos/600/400',
    imageHint: 'data cleaning',
    content: `
<p>In the glamorous world of data science, we often hear about sophisticated models and stunning visualizations. However, the most critical and time-consuming phase is often the least celebrated: data cleaning.</p>
<h3 class="text-xl font-headline font-semibold mt-6 mb-4">What is Data Cleaning?</h3>
<p>Data cleaning, also known as data cleansing or data wrangling, is the process of detecting and correcting (or removing) corrupt or inaccurate records from a dataset. This includes handling missing values, correcting inconsistencies, and removing duplicates.</p>
<h3 class="text-xl font-headline font-semibold mt-6 mb-4">Why It Matters</h3>
<p>The principle of "garbage in, garbage out" holds true in machine learning. No matter how advanced your model is, its performance will be poor if the data it's trained on is flawed. Clean, high-quality data ensures that your model's insights are accurate, reliable, and ultimately, valuable.</p>
`,
  },
];
