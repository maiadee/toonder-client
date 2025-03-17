# Toonder

### Description

We had one week to complete our third project of the course, and in a team of three, we decided to get a little creative and build a dating app for cartoons! The app lets users create an account and profile, swipe to like or dislike other profiles, and see their matches.

### Collaborators 

Anna Jones
Ari Ram

![Toonder](<ReadMe Images/toonder-home.png>)

### Deployment

We deployed the app on Netlify - https://toonder.netlify.app/

To sign in and explore the app please register and create a profile or use the following existing details:

Email: Ariel

Password: Ariel123!

### Brief

For this group project, we were tasked with building a full-stack application, developing both the front and backend using React. Our database was stored in MongoDB, and we needed to create a MERN app with full CRUD functionality. The project also required us to focus on a visually appealing design and deploy the app online to ensure it was publicly accessible.

- The back-end application is built with Express and Node.
- The front-end application is built with React.
- MongoDB is used as the database management system.
- The back-end and front-end applications implement JWT token-based authentication to sign up, sign in, and sign out users.
- Authorization is implemented across the front-end and back-end. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
- The project has at least two data entities in addition to the User model. At least one entity must have a relationship with the User model.
- The project has full CRUD functionality on both the back-end and front-end.
- The front-end application does not hold any secret keys. Public APIs that require secret keys must be accessed from the back-end application.
- The project is deployed online so that the rest of the world can use it.

### Technologies used

Node.js, Express.js, React, Javascript, CSS, HTML, MongoDB, Mongo Atlas, Mongoose, Postman, Netlify, Trello, Material-UI

### Planning

![Toonder](<ReadMe Images/toonder-wireframe.png>)

![Toonder](<ReadMe Images/toonder-erd.png>)

![Toonder](<ReadMe Images/toonder-trello.png>)

### Build/Code Process

#### Build plan

- As a group, we made a plan to tackle the API together before splitting off to work on our individual front-end tasks. We held daily stand-ups to check in as a team, go over our progress, discuss any time concerns, and share new ideas or thoughts.
- Starting this project from scratch felt pretty daunting, but working through the API together really helped solidify our understanding of what each part does and why it's necessary. While it was less conventional to complete the entire backend as a group, it ended up benefiting us by building our confidence, which made it easier to split off and tackle individual tasks.

#### Building the Backend

- We tackled authentication early on, as most of our app required a user to be logged in. This involved setting up bearer tokens, session handling, and securing routes.

``` javascript
export default async function validateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("No authorization was present on the request");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid header syntax");
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(payload.user._id);
    if (!user) throw new Error("Token valid but user not found");
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
```
- We created the above middleware to ensure that only users with a valid token can access protected routes. It extracts and validates the token from the request, verifies its authenticity, and checks that the user linked to the token exists. If everything is valid, authenticated requests are allowed to continue; otherwise, unauthorized requests are rejected with a clear error message. This middleware is a highly useful piece of code that we can reuse in future projects!

- One of the most challenging aspects was building the logic for filtering index cards based on gender and preferences in our schemas. There were multiple conditions to consider, and the logic kept changing as we fine-tuned it. It took time, but we ended up with a solid solution and learned a lot along the way, particularly about Mongo queries.
- Another tricky part was handling the "like" functionality. Once a user liked another user's profile, we had to check if they were a match by reviewing their likes array. Based on this, we either pushed the like to the user's likes array or added it to their matches array.

``` javascript 
if (likedProfile.likes.includes(loggedInProfileId)) {
      loggedInProfile.matches.push(id);
      likedProfile.matches.push(loggedInProfileId);

      message = "💖💍 It's a match!";
    }
```
- This code is interesting because it dynamically manages user interactions by checking if two users have mutually liked each other, and if so, marks them as a match. It efficiently updates both users' data, adding them to each other's "matches" array and providing real-time feedback, which is a key feature in dating apps.

#### Building the Frontend

- Once we moved onto the client side, we delegated specific components to each other. I was assigned two of the more complex components—Index Card and Matches Card—since both required handling profile likes and displaying user matches. I spent a good portion of the project working on these components and found myself constantly updating the API to ensure proper functionality.

![Toonder](<ReadMe Images/toonder-index.png>)

``` javascript
const handleLike = async () => {
    if (!currentProfile) return;
    setIsLoading(true);
    try {
      const response = await profileLike(currentProfile._id);
  
      if (response.message.includes("It's a match")) {
        setMatchMessage(`🎉 You matched with ${currentProfile.name}! 🎉`);
  
        setTimeout(() => {
          setMatchMessage("");
          fetchProfile();
        }, 3000);
      } else {
        fetchProfile();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
```
- This function manages the 'like' interaction on the frontend. When a user likes a profile, it triggers an API request and checks if it's a match. If it's a match, a congratulatory message is displayed, and after 3 seconds, the profile fetches again. The use of loading states and real-time feedback enhances the user experience, ensuring smooth interaction.

- There was a bit of a domino effect, where getting one part to work would sometimes cause other parts of the app to break. However, I managed to work through it, and using my teammates for feedback really helped speed up the problem-solving process.

#### UI/UX Enhancements

- While working on these pages, we decided to use a modal to enhance the UX of the app. This was my first experience with Bootstrap Material-UI, and I found it to have a gentle learning curve. It's definitely a tool I’ll be using again in future projects.

![Toonder](<ReadMe Images/toonder-matchmodal.png>)

### Challenges

- Pinpointing errors when working with both the API and client side, especially with so many files involved. The order of API controllers often affected which controller was being called.
- Understanding error messages and figuring out which file they were coming from, as well as what data was successfully fetched from the API and what wasn’t.
- Dealing with how easily other people’s code could affect yours, like when the navbar link didn’t match the controller route. Something so simple ended up tripping us up.
- Struggling with logic in the API not working once the client side introduced its own logic.
- Working in a group had its challenges, especially with people changing each other’s code or the worry of unintentionally affecting someone else’s work

### Wins

- The filtering logic was a challenging part of the project, as it involved refining how we presented profiles based on the logged-in user's preferences and likes. We spent a lot of time going back and forth, testing different approaches, and refining the code until it worked - 

```javascript
router.get("/profiles", validateToken, async (req, res, next) => {
  try {
    const userProfileId = req.user.profile;
    const userProfile = await Profile.findById(userProfileId);

    const likedProfiles = userProfile.likes || [];

    let query = {
      _id: { $nin: [...likedProfiles, userProfileId] },
      gender: userProfile.preferences, 
      preferences: userProfile.gender, 
    };

    if (userProfile.preferences === "no preference") {
      delete query.gender;
    }

    const filteredProfiles = await Profile.find(query)
      .populate("name")
      .populate("age")
      .populate("location")
      .populate("profileImage");

    res.json(filteredProfiles);
  } catch (error) {
    next(error);
  }
});
```
- We had to test and iterate over different conditions, ensuring that users weren't shown profiles they've already liked and that the results aligned with their gender preferences. 

- The whole index card was a win! It involved dealing with several functions - profileLike, profileDislike, profileShow, and profileIndex. Getting them all to work in one component felt incredibly satisfying. I really pushed myself and learned a lot about the relationships between the API and client, and how they work together.

### Key Learnings/Takeaways

- I feel more confident with the API after this week, especially in understanding how it works and how it impacts the logic on the client side.
- I’ve gotten better at troubleshooting and figuring out where bugs are coming from, with the ability to trace issues back to their source more effectively.

### Bugs

- The Index cards flicker before moving on to the next card when a user has liked or disliked a profile.
- Images aren't showing for all profile cards from our seeded data.

### Future Improvements

- Having a chat function. Unread message symbol displayed on particular profile card to signal a message has been sent
- Slide in transition of the two cards together when there is a match - improves the UX
- When a user likes a profile card, the card flies to the left, when they dislike, the card flies to the right
- New profile cards slide up from the bottom of the screen when exploring potential matches
- Filtering profiles by location
- Users can add their D.O.B rather than age when making their profile - this would increase each year
- Add an errorController.js file for nicer error messages - improve the UX



