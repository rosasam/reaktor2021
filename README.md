# Wardrobe
### A coding assignment for Reaktor junior developer applicants (2021)

A simple webapp that displays product information fetched from Reaktor's badApi.  
See it live on [Heroku](https://rocky-citadel-65023.herokuapp.com).

The webapp code is split into two apps:  
- Frontend
- Backend

The backend is responsible for fetching data from the slow BadApi endpoints, storing it in memory, and serving it to the frontend.  
The frontend fetches data from the backend, and displays it neatly. The data in the backend is updated each hour from badApi, but a user has the option to trigger an immediate update (though this is slow).  
Only the 50 first items are shown on each category page (as to decrease initial rendering time of the page), though more can be loaded by pressing the 'Show all' button at the bottom of the page.