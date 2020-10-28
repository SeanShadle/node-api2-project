const express = require('express');
const Posts = require("../data/db");
const router = express.Router();

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving posts",
            });
        });
    });

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Post not found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving post",
            });
        });
    });

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json({ data: post})
            } else {
                res.status(404).json({message: 'A post with that ID was not found or does not exist'})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Post information could not be retrieved'
            })
        })
    })

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            if(post){
                res.status(201).json(post);
            }else{
                res.status(400).json({errorMessage: "Please provide title and contents for post"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error adding the post",
            });
        });
    });

router.post('/:id/comments', (req, res) => {
    const {text} = req.body;
    const {id: post_id} = req.params;

    if(!req.body.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment"
        })
    }
    Posts.insertComment({text, post_id})
        .then(comment => {
            if(!comment.id){
                res.status(404).json({
                    message: 'A post with the specified ID does not exist.'
                })
            } else {
                res.status(201).json(comment)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: 'There was an error while saving the comment to the database'
            })
        })
    })
    
router.put('/:id', (req, res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            errorMessage: 'Please provide title and contents for the post'
        })
    }
    Posts.update(req.params.id, req.body)
        .then(post => {
            if(post){
                console.log(post)
                res.status(200).json(post)
            }else{
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: 'The post information could not bed modified'
            })
        })
    })

    

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json({message: "The post has been deleted"});
            } else {
                res.status(404).json({message: "The post could not be found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error removing the post",
            });
        });
    });


module.exports = router;