import axios from "axios";
export default function generateTypingText(difficulty = 'medium', duration = 45) {
  const words = {
    easy: [
      'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 
      'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him',
      'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who',
      'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'woman'
    ],
    medium: [
      'about', 'above', 'across', 'after', 'against', 'around', 'before', 
      'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'during',
      'except', 'inside', 'outside', 'through', 'toward', 'under', 'within',
      'quick', 'brown', 'fox', 'jumps', 'lazy', 'dog', 'bright', 'vivid',
      'colors', 'happy', 'jolly', 'sunny', 'weather', 'perfect', 'moment'
    ],
    hard: [
      'ambiguous', 'paradox', 'juxtaposition', 'kaleidoscope', 'quintessential',
      'extravaganza', 'mellifluous', 'serendipity', 'ubiquitous', 'vociferous',
      'xenophobia', 'zeitgeist', 'asymptotic', 'bourgeoisie', 'connoisseur',
      'demagogue', 'epistemology', 'facetious', 'grandiloquent', 'heterogeneous',
      'idiosyncratic', 'jurisprudence', 'lackadaisical', 'meticulous', 'nefarious'
    ]
  };

  const templates = [
    "The $adj $noun $verb $prep the $adj $noun.",
    "$adj $noun $verb $prep $adj $noun and $verb $prep the $noun.",
    "When the $noun $verb, the $noun $verb $prep the $adj $noun.",
    "$adj $noun $verb $prep $adj $noun while $verb $prep $adj $noun."
  ];

  const parts = {
    adj: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry', 'bright', 'vivid', 'happy'],
    noun: ['fox', 'dog', 'cat', 'bird', 'car', 'house', 'tree', 'child'],
    verb: ['jumps', 'runs', 'flies', 'sings', 'drives', 'sleeps', 'eats', 'plays'],
    prep: ['over', 'under', 'near', 'beside', 'around', 'through', 'between', 'against']
  };

  const wordCount = Math.floor(duration * 0.8); 
  let text = '';
  
  if (Math.random() > 0.3) {
    while (text.split(' ').length < wordCount) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      let sentence = template;
      
      sentence = sentence.replace(/\$adj/g, () => parts.adj[Math.floor(Math.random() * parts.adj.length)]);
      sentence = sentence.replace(/\$noun/g, () => parts.noun[Math.floor(Math.random() * parts.noun.length)]);
      sentence = sentence.replace(/\$verb/g, () => parts.verb[Math.floor(Math.random() * parts.verb.length)]);
      sentence = sentence.replace(/\$prep/g, () => parts.prep[Math.floor(Math.random() * parts.prep.length)]);
      
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      text += (text ? ' ' : '') + sentence;
    }
  } else {
    const wordList = words[difficulty] || words.medium;
    while (text.split(' ').length < wordCount) {
      const word = wordList[Math.floor(Math.random() * wordList.length)];
      text += (text ? ' ' : '') + word;
    }
    text = text.charAt(0).toUpperCase() + text.slice(1) + '.';
  }

  const allWords = text.split(' ');
  return allWords.slice(0, wordCount).join(' ');
}


export const targetText = async ()=>{
    try {
      const token = localStorage.getItem("jwttoken");
      if (!token) {
        alert("Please login first!");
        console.log("No token found");
        return;
      }

      const response = await axios.get("https://typearcade-backend.onrender.com/test/starttest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        return response.data.mainText + generateTypingText("easy",30);
      }
       
    } catch (error) {
      alert(error);
      
      console.log("Error starting test:", error.response ? error.response.data : error.message);
    }
  };
  
  
