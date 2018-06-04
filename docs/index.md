# ColorJS
A simple JS librairy to create slideshows in HTML/CSS

ColorJS is a JS library that you can use to create animated slideshows writing HTML and CSS only. It speeds up the creation process.
>Please note that this project is still in development and that I am not a professionnal developer, so there are still a lot of issues that I'm trying to resolve.

>Anyway, the library is already avaliable to use and works good ! I used it for all of my final exams presentations.

## How it works
ColorJS works by analysing the DOM and animating each element with the class `slide` and the attribute `animate`. The script itself just adds and removes classes to make the animation progress.
>Whaaat ? Didn't understand

For example if you have only 3 `div` with the class `slide` in your HTML document, the script will add it to the list of animated elements and will animate them in the order they appear in the code.

Now if you want an element to appear only when you want, you can add the attribute `animate=1` for example, and the script will make this element appear at the first click after the begenning of the slide.

## How to use it
To learn how to create your slideshow, go on [readthedocs](https://colorjs.readthedocs.io/en/latest/) ;)
