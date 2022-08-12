// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];
  
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add("flex-around");

menuLinks.forEach(link => {
    const aElement = document.createElement('a');
    aElement.setAttribute('href', link.href);
    aElement.innerHTML = link.text;
    topMenuEl.appendChild(aElement);
}); 

const subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add("flex-around");
subMenuEl.style.setProperty('position', 'absolute');
subMenuEl.style.setProperty('top', '0');

const topMenuLinks = topMenuEl.querySelectorAll('a');  // select all <a> elements and assign it to topElementLinks
let showingSubMenu = false;
let currentLink = [];
topMenuEl.addEventListener('click', (event) => {  
  event.preventDefault();
    if(event.target.classList.contains("active")) {
        event.target.classList.remove('active');
        showingSubMenu = false;
        subMenuEl.style.setProperty('top', '0');
        return;
    }
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    if(event.target.text === 'about') {
      mainEl.innerHTML = `<h1>${event.target.text}</h1>`; // changes mainEl to display about
    }
    else {
      for (let i = 1; i < menuLinks.length; i++) {
        // console.log(menuLinks[i].href);
        // console.log(event.target.text);
  
        if(menuLinks[i].text == event.target.text  && menuLinks[i].subLinks) {
          showingSubMenu = true;
          currentLink = [];
          currentLink.push(menuLinks[i].subLinks);
          subMenuEl.style.setProperty('top', '100%');
          buildSubMenu(currentLink);
          break;
          }
          else {
               showingSubMenu = false;
               subMenuEl.style.setProperty('top', '0');
           }
        }
    }
    

    // console.log(showingSubMenu);
});

subMenuEl.addEventListener('click', (event) => {
  event.preventDefault();
    showingSubMenu = false;
    subMenuEl.style.setProperty('top', '0');
    topMenuLinks.forEach(link => {
      link.classList.remove('active');
    });
    if (event.target !== 'about') {
      mainEl.innerHTML = `<h1>${event.target.text}</h1>`;
    }
});

const buildSubMenu = ((linksArray) => {
  // console.log(linksArray);
  // console.log('OK Here');  // note that most console logs comments are used for debugging various stages of code.
  subMenuEl.innerHTML =' ';
  for (let i = 0; i < linksArray[0].length; i++) {   // to access the elements of the subLinks array, which is a nested array in a nested array.
    const aElement = document.createElement('a');
    aElement.setAttribute('href', linksArray[0][i].href);
    aElement.innerHTML = linksArray[0][i].text;
    subMenuEl.appendChild(aElement);
  }
}); 