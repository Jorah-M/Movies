## How to start

To start the project, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Architecture
Project structure is pretty standard. As it's simple yet, there is no Routing, Redux, etc.\
Couple of functions that can be reused in future were moved to special folder (utils), so do the colors (constants - defaultStyles).

I also used styled components, because it's pretty convenient in using props as condition / value in styles.
I often use them, until it comes to huge components with a lot of CSS.

### Improvements
- Make mobile version of table (now it looks well at tablets, but awful on small mobile width).
- Transfer onKeyUp listeners from input to modal.
- Add commentator's name and avatar to comment section.
- If some other modals were expected in project - it would be better to make one modal component and use it for all modals, passing props and content to it.
- If movies amount is going to increase - some kind of pagination would be needed.