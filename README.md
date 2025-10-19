# _"As a user, I want to keep a log of my film reviews."_

Using React and supporting libraries of your choice, build a simple web application to fulfill this user story. It doesn't need to be polished aesthetically, but it should meet the basic requirements in a robust manner.

### Further development
If I had more time there would be a few small things I would have looked to achieve as part of this assessment:
1. Create a loading state - at the moment there is a flash of nothing as the film data is retrieved from local storage.
2. Add tests! I was hoping to have time to write at least a few, rather than just setting up the environment.
3. Validate the "New Review" form - make sure a use selects a film (have yet to think as to whether both the review text and the star rating would be required fields...)
4. Add a search bar to the Film Log page so if a user has lots of films logged they can easily find the one they are looking for.
5. Allow the ability to edit an existing review - this would probably be from the `/id` page and would bring up the same modal as the "New Review", but pre-populated with the existing data.
6. Check responsiveness - I didn't have time to properly check how it was behaving in all scenarios (e.g. with long film titles)

### Up and running

* Once you have the code checked out locally, first run `npm install`
* Run `npm run dev` for dev server at http://localhost:5173
* You can also run `npm run build` to build the app bundle into dist, and then to preview the built app, run `npm run preview`
* To run tests, run `npm run test`
