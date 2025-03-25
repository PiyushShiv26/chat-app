import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try{

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});

        if (user){
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id:   newUser._id,
                fullName: newUser.name,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });
        } else{
            res.status(400).json({message: "Invalid user data"});
        }
    } catch(error){
        console.log("Error in signup:", error.message);
        res.status(500).json({message: "Internal Server error"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Email does not exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    }catch(error){
        console.log("Error in login:", error.message);
        res.status(500).json({message: "Internal Server error"});
    }
}

export const logout = (req, res) => {
    try{
        res.Cookie('jwt','',{maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch(error){
        console.log("Error in logout:", error.message);
    }
}


export const updateProfile = async (req, res) => {
    try{
        const {profilePicture} = req.body;
        const userID = req.user._id;

        if(!profilePicture){
            return res.status(400).json({message: "Profile picture is required"});
        }

        const uploudResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userID, {profilePicture: uploudResponse.secure_url}, {new: true});

        res.status(200).json(updatedUser);
    }catch(error){
        console.log("Error in updateProfile:", error.message);
        res.status(500).json({message: "Internal Server error"});
    }
};

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth:", error.message);
        res.status(500).json({message: "Internal Server error"});
    }
}