const express = require('express');
const ReadingList = require('../models/ReadingList');
const router = express.Router();

router.get('/', async(req,res) =>{
    try{
        const readingList = await ReadingList.findOne();
        res.json(readingList);
    }
    catch (error) {
        res.status(500).json({message: error.message}); // geting bookList
    }

});

router.post('/', async(req,res) =>{
    try{
        const{ title, author } = req.body;
        const readingList = await ReadingList.findOneAndUpdate(
            {},
            {
                $push: {books:{ title, author}},
            },
            { new: true, upsert: true }
        );
        res.json(readingList);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
});
router.delete('/:bookId', async (req, res) => {
    try {
      const readingList = await ReadingList.findOneAndUpdate(
        {},
        {
          $pull: { books: { _id: req.params.bookId } },
        },
        { new: true }
      );
      res.json(readingList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //updating readinglist
  router.put('/:bookId', async (req, res) => {
    try {
      const { title, author} = req.body;
      if (!title || !author ) {
        return res.status(400).json({ message: 'Title, author are required.' });
      }
  
      const readingList = await ReadingList.findOneAndUpdate(
        { "books._id": req.params.bookId }, // looking for _id
        {
          $set: {
            "books.$.title": title,        // update title
            "books.$.author": author,      // update author
            
          },
        },
        { new: true } // giving update version
      );
  
      if (!readingList) {
        return res.status(404).json({ message: 'Reading list not found or book ID does not exist.' });
      }
  
      res.json(readingList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;