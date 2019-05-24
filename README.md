# Adorn

 Adorn utilizes Augmented Reality (AR) to allow you to visualize 3D models of furniture in your choice of space.

## Technologies

- [Viro](https://docs.viromedia.com/docs/) - AR platform
- [React Native](https://facebook.github.io/react-native/) - Mobile application framework
- [Native Base UI](https://nativebase.io/) - Styling and user interface
- [Firebase](http://firebase.google.com/docs) - Storage of user data and furniture data
- [Cloudinary](https://cloudinary.com/documentation) - File storage for meshes and textures
- [ngrok](https://ngrok.com/docs) - Tunneling proxy

## Installation

 First, fork and clone this repository. 

 `git clone https://github.com/cats-capstone/adorn.git`
 
 Next, install dependencies. 
 
 `npm install`
 
 Then, link libraries. For issues linking libraries, check [this out](https://facebook.github.io/react-native/docs/linking-libraries-ios)
 
 `react-native link`
 
 Then, visit ViroMedia.com and request an API key. Create a file in the root directory of your project called `secrets.js`. Export your API key as `export const VIRO_KEY = 'YOUR_API_KEY_STRING_HERE'`. 
 
 Finally, run the project on your device through Xcode (Version 10+ and iOS device required)
 
 
 ## Usage

 Once your app is up and running, you can start by creating an account or using the app as a guest. 

 Browse the available furniture and click on a desired piece to view its details. 

 Move the piece around using one finger gestures and rotate the piece using two fingers.

 Add more items by pressing the add icon, or delete items from the room by pressing the delete icon.

## Demo

 For a full demonstration, check out [our video here](https://www.youtube.com/watch?v=eNqGN8KIJxc&feature=youtu.be).

## Team
- [Janelle Henney](https://github.com/janellehenney)
- [Helen Li](https://github.com/li-helen)
- [Barry Ng](https://github.com/hucklebarry)

 
 ## License
 
 [Viro](https://docs.viromedia.com/docs/license)
