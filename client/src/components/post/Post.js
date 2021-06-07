import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import PropTypes from 'prop-types'
import Sidebar from '../layout/Sidebar'
import CreateComment from './CreateComment'
import CommentItem from './CommentItem'
import PostItem from '../posts/PostItem'

const Post = ({ getPost, post: {post, loading}, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])
    return !loading && post !== null && (
        <Fragment>
            <Sidebar />
            <div style={{ gridArea: 'content' }}>
                <CreateComment postId={post._id}/>
                <br />
                {/* post not reloading on vote change */}
                {/* make new component and send postid then fetch by getpost */}
                <PostItem post={post} />
                <br />
                <h3>Comments: </h3>
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost })(Post)