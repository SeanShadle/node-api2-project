const express = require('express');
const Comments = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
    Comments.findPostComments(req.params.id)
        .then(comments => {
        if (comments.length) {
            res.status(200).json({ data: comments })
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
        .catch(err => {
            console.log(err.comments)
            res.status(500).json({
                error: 'The comments information could not be retrieved.'
            })
        })
})

module.exports = router

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'The post information could not be retrieved.'
        })
    })
})

