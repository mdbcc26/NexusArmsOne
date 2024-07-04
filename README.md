# SS2024 SSC Group15
Mate Brader, Igor Bodrov, Matt Dalton, Niklas Reisinger. 

## To run the project

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the project. (Alternatively you can run `node app.js` to start the project)
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

Creat you own account and login. Or if you are lazy, here are some accounts you can use:
- Username: `BeerKing`, Password: `beer`

## About the project: NexusArms

- This project is a web application that allows users to create and manage their own personal armory. 
- Users can add and edit weapons from their armory. As well as delete their account.
- They can also view other users' armories and add weapons to their own armory. 
- Users can also chat with other users in real-time.

## Things we have implemented and not implemented

- Everything was submitted correctly (no node_modules, easy but detailed enough description for the lecturer how to start the project and test it, list of which criteria have been implemented and which not, credentials for your database so that I can login are included, credentials for two users - one with and one without Admin rights are included, project works if I run an npm install & node app.js, and so on) (0p this is mandatory) ✅
- Users can be: displayed, added, updated & deleted (10p) ✅
- Nice overall design that is consistent throughout all views and appealing to a user (refer to the examples of Lecture #1) (5p) ✅
- New users can register themselves and the password is saved encrypted in the database (5p) ✅
- Users can log in and log out (using JWT) (5p) ✅
- Only users with the role "Administrator" can change data. Users can only edit their own profile. (5p) ❌
- There are at least 3 other tables in correspondence with the users that also have their own model, controller and views implemented. (10p) ✅
(e.g. if you have users and a Pokémon design you could add the same thing we did with the users for Pokémon and then add one more view that shows which users have which Pokémon in their team)
- Have at least a model, view, and controller for one of those other tables -> even if those are just getting the data from the table and display it in the view. For the other 2 tables it's okay if you just want to join them using SQL. That depends on your project and what you want to do. ✅
- There is a chat with different rooms and users can switch between rooms. (5p) ✅
- Everything works as expected and there are no unhandled errors or blank pages (5p) ✅
- Project is hosted online (e.g. via UAS Node.js Hosting Service) (10p) ✅

### Optional Criteria: (50p)
- User experience: The project should have a user-friendly interface that is easy to navigate and understand (self-explaining!). Design should be visually appealing, creative, and functional. (5p) ✅
- Documentation: functions have comments that explain what the function does so that you still know it what your code does if you read it in one year (5p) ✅
- All errors are handled with proper error handling capabilities and users get at least a nice/funny "404 not found" page (5p) ❌
- Code follows naming conventions, is tidied up, clean and self-explanatory even when someone else reads it (5p) ✅
- Picture upload works and uses UUID (5p) ❌
- Users can upload/update their profile pictures. (5p) ❌
- The chat uses the name of the user when logged in and else „guest” (5p) ❌
- JWT passed in the HTTP header and not in cookies (5p) ❌
- Only administrators can view all user data. Users can only see which other users exist as well as their "public" profiles (5p) ❌
- Users can delete their own profile (5p) ✅