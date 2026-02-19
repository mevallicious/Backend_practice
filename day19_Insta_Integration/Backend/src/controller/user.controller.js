const followModel =require("../model/follow.model")
const userModel =require("../model/user.model")

async function followUserController(req,res){
    const followerUsername =req.user.username
    const followeeUsername =req.params.username

    if(followerUsername ===followeeUsername){
        return res.status(409).json({
            message:"you cant follow yourself"
        })
    }

    const isfolloweeExists =await userModel.findOne({
        username:followeeUsername
    })

    if(!isfolloweeExists){
        return res.status(404).json({
            message:"User you are trying to follow doesnt exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`you are already following ${followeeUsername}`
        })
    }

    const followRecords = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername,
        status:"pending"
    })

    res.status(201).json({
        message:`you are following ${followeeUsername}`,
        follow:followRecords
    })
}

async function getFollowRequestsController(req,res){

    const username =req.user.username

    const requests =await followModel.create({
        followee:username,
        status:"pending"
    })

    res.status(200).json({
        message:"Pending requests fetched",
        requests
    })
}

async function acceptFollowerController(req,res){
    const follower =req.user.username
    const followee = req.params.username

    const request =await followModel.findOne({
        follower,followee,status:"pendind"
    })

    if(!request){
        return res.status(404).json({
            message:"Follow request not found"
        })
    }

    request.status ="accepted"
    await request.save()

    res.status(200).json({
        message:`you accept ${follower}'s follow request`
    })
}

async function rejectFollowerController(req,res){
    const follower =req.user.username
    const followee =req.params.username

    const request = await followModel.findOne({
        followee,follower,status:"pending"
    })

    if(!request){
        return res.status(404).json({
            message:"Follow request not found"
        })
    }

    await followModel.deleteOne({
        follower,
        followee
    })

    res.status(200).json({
        message:`You rejected ${follower}'s follow request`
    })
}

async function unfollowUserController(req,res){
    const followerUsername =req.user.username
    const followeeUsername =req.params.username

    if(followerUsername ===followeeUsername){
        return res.status(409).json({
            message:"you cant unfollow yourself"
        })
    }

    const isUserFollowing =await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(!isUserFollowing){
        return res.status(404).json({
            message:`you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(201).json({
        message:`you have unfollowed ${followeeUsername}`,
    })
}


module.exports ={
    followUserController,
    unfollowUserController,
    getFollowRequestsController,
    acceptFollowerController,
    rejectFollowerController
}