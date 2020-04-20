

I suspect it’s not that easy to deal with dozen different projects to realize everyone's problems, but if you are still bothered by only a few students ...

## Ok, the problem

As you can remember from our last meeting I had lots of questions about data fetching and management. Especially with data I need within home screen. So, first things first.

### Current firestore data model:

- User _(firestore document)_

  - User name

  - Cards _(firestore collection with the next doc's structure)_

    - Content 
      - front
      - Back
    - Collection_id
    - Next_repetition_date
    - Learning_stage

  - Collections _(firestore collection with the next doc's structure)_

    - Name
    - Created_date
    - the rest is in question yet



### Data we need on the /home: 

- User name
- Total number of cards to repeat 
- Cards to repeat grouped by collection number 



#### Two big problems I need to solve:

- To gain total number of cards to repeat  we should query cards collection with “where” clause that checks whether a card is ready for repeat

  - First problem here is **how** to determine that card is *“ready”*. I thought I could just compare _“next_repetition_date”_ with current date. But I couldn't find the way to implement it because firestore stores dates as Timestamp and has no mechanism to compare two Timestamp objects with ">=" or so. (since Timestamp consist of _seconds_ and _nanoseconds_ properties I tried to use _seconds_ as key for comparison. Maybe I made something wrong but it didn't work)
  - Another approach I reasoned is to store boolean field like _“is_need_to_repeat”_ that will dynamically update with some period (maybe.. every midnight server goes through all cards, compare dates and update this field if needed. Just thoughts 🙂 ). But to be honest I have no real idea how to implement it. 

- Ok, consider that we miraculosly found the way to determine which cards need repetition. It meens we could fetch all cards we need to repeat as an array of docs. What next?) We need to fill our links ![](https://github.com/Nastik1811/flippy-cards/blob/firebase/screen.jpg) 
But ... Firestore don’t provide grouping queries (so we can’t group cards by collection_id). 

  Some ideas:

  1. Maybe there is a way to write a js-function to perform such grouping. 

  2. Another idea — have the same “is_need_to_repeat” field for collection (and when card ’s status updates — the status of its collection also updates… but again I'm not sure about the possibility of such an implementation ).

  3. Store some card information, that helps determine whether a collection need repetition, inside the collection

      **Collection** _(firestore document)_

      - Name: name

      - Created_date: date
      - Cards: [card_1, card_2, ...]  *// card_i ~ { id, is_need_to_repeat }*

      I personally like this approach most, but on those firestore YouTube playlist was said that arrays in firesore are weird and it's better not to use them. (but I need to recall what exactly is strange about them)

    
--- 

Of course, there is plenty of other issues, but that should be solved first, I think.

Hope, I managed to clearly explain the problem :)
