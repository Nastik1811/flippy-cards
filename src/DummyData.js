export const collections = [
    {
        name: "English words",
        created: Date.now(),
        cards: [
            {
                front: "Mandatory",
                back: "Обязательный",
                stage: 0
            },
            {
                front: "Tissue",
                back: "Ткань",
                stage: 0
            },
            {
                front: "Quirk",
                back: "Причуда",
                stage: 0
            },
            {
                front: "Hence",
                back: "Поэтому",
                stage: 0
            }
        ]
    },
    {
        name: "JS",
        created: Date.now(),
        cards: [
            {
                front: "How could you create a copy of array?",
                back: "Using map() fuction",
                stage: 0
            },
            {
                front: "What is the DOM?",
                back: `It is a tree-like structure that is modeled from the HTML document. 
                 The DOM is used for interacting and modifying the DOM structure or specific Elements or Nodes.`,
                 stage: 0
            },
            {
                front: "What is event.target ?",
                back: "In simplest terms, the event.target is the element on which the event occurred or the element that triggered the event.",
                stage: 0
            },
            {
                front: "What is Scope?",
                back: `Scope in JavaScript is the area where we have valid access to variables or functions. 
                JavaScript has three types of Scopes. Global Scope, Function Scope, and Block Scope(ES6).`,
                stage: 0
            },
            {
                front: "What is this?",
                back: `this is actually a binding that is made when a function is invoked, and *what* it references 
                is determined entirely by the call-site where the function is called.`,
                stage: 0
            }
        ]
    },
    {
        name: "React",
        created: Date.now(),
        cards: [
            {
                front: "What is the main rule of using hooks?",
                back: "Hooks can be used only inside function components or other hooks",
                stage: 0
            }
        ]
    }
]

function getCollections(){
    return collections;
}

function getCards(collectionIndex){
    return collections[collectionIndex]['cards'];
}
