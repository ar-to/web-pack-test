// Normally you would import these like `import React, { Component } from 'react';`
// const React = window.React;
// const ReactDOM = window.ReactDOM;
// const Component = React.Component;
import React, { Component } from 'react';
const Shuffle = window.Shuffle;
// const Shuffle = "../../bower_components/shufflejs/dist/shuffle.min.js";

import './shuffle.css';

// A very simple app with one component.
class SortFilter extends Component {
  render() {
    return (
      <div className="container">
        {/* <Search /> */}
        <PhotoGrid />
      </div>
    );
  }
}

// Create the component which will use Shuffle.
class PhotoGrid extends Component {
  constructor(props) {
    super(props);

    // Initialize with some "photos" that are cached (or none at all). Maybe you
    // have a service worker that cached the last API response and you can
    // use that here while waiting on a network request.
    const grayPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
    const blackPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    const greenPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02Vz4HwAE9AJhcLBN6AAAAABJRU5ErkJggg==';

    this.state = {
      photos: [
        { id: 1, src: grayPixel },
        { id: 2, src: blackPixel },
        { id: 3, src: greenPixel },
      ],
    };
  }

  /**
   * Fake and API request for a set of images.
   * @return {Promise<Object[]>} A promise which resolves with an array of objects.
   */
  _fetchPhotos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 4, username: '@stickermule', name: 'Sticker Mule', src: 'https://images.unsplash.com/photo-1484244233201-29892afe6a2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=14d236624576109b51e85bd5d7ebfbfc' },
          { id: 5, username: '@prostoroman', name: 'Roman Logov', src: 'https://images.unsplash.com/photo-1465414829459-d228b58caf6e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=7a7080fc0699869b1921cb1e7047c5b3' },
          { id: 6, username: '@richienolan', name: 'Richard Nolan', src: 'https://images.unsplash.com/photo-1478033394151-c931d5a4bdd6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=3c74d594a86e26c5a319f4e17b36146e' },
          { id: 7, username: '@wexor', name: 'Wexor Tmg', src: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=11ff283143c782980861a442a957da8e' },
          { id: 8, username: '@dnevozhai', name: 'Denys Nevozhai', src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=ea06c0f0700ec469fdcb32e0d4c2928e' },
          { id: 9, username: '@aronvandepol', name: 'Aron Van de Pol', src: 'https://images.unsplash.com/photo-1469719847081-4757697d117a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=9a568bc48e42d3bb60c97c0eb3dc20ac' },
        ]);
      }, 300);
    });
  }

  /**
   * Resolve a promise when all the photos in an array have loaded.
   * @param {Object[]} photos Photos to load.
   * @return {Promise.<Object[]>} Loaded images.
   */
  _whenPhotosLoaded(photos) {
    return Promise.all(photos.map(photo => new Promise((resolve) => {
      const image = document.createElement('img');
      image.src = photo.src;

      if (image.naturalWidth > 0 || image.complete) {
        resolve(photo);
      } else {
        image.onload = () => {
          resolve(photo);
        };
      }
    })));
  }

  componentDidMount() {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = new Shuffle(this.element, {
      itemSelector: '.photo-item',
      sizer: this.sizer,
    });

    // Kick off the network request and update the state once it returns.
    this._fetchPhotos()
      .then(this._whenPhotosLoaded.bind(this))
      .then((photos) => {
        this.setState({ photos });
      });

    // inititate search feature
    this.search.addEventListener('keyup', this.handleSearchKeyup);
    // initiate button sort by name
    this.name.addEventListener('click', this.sortByNameUpdate);
    this.all.addEventListener('click', this.sortByNameUpdate2);
  }

  componentDidUpdate() {
    // Notify shuffle to dump the elements it's currently holding and consider
    // all elements matching the `itemSelector` as new.
    this.shuffle.resetItems();
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  }

  /**
   * Search UI for filtering by name
   */
  searchUI = () => {
    return (
      <div className="row">
        <div className="col-md-4 col-3@md">
          <div className="filters-group">
            <label htmlFor="filters-search-input2" className="filter-label">Search</label>
            <input ref={search => this.search = search} className="textfield filter__search js-shuffle-search2" type="search" id="filters-search-input2" />
          </div>
        </div>
      </div>
    );
  };

  /**
   * Search handlers via shufflejs filter
   * filters by name
   * @return {boolean} 
   */
  handleSearchKeyup = (evt) => {
    var searchText = evt.target.value.toLowerCase();
    console.log('handle key evt: ', evt);
    console.log('searchText: ', searchText);

    this.shuffle.filter(function (element, shuffle) {
        console.log('filter element: ', element);
        var titleElement = element.querySelector('.name');
        var titleText = titleElement.textContent.toLowerCase().trim();
        var t = titleText.indexOf(searchText);
        var f = titleText.indexOf(searchText) !== -1;
        console.log('titleElement: ', titleElement);
        console.log('titleText: ', titleText);
        console.log('t: ', t);
        console.log('f: ', f);
    
        return titleText.indexOf(searchText) !== -1;
    });
    // shuffleInstance.filter('animal');
  };

  /**
   * Button UI for sorting by name
   */
  sortButton = (name) => {
    return (
      <button ref={name => this.name = name}>{name}</button>
    )
  }

  /**
   * Button UI for sorting by name
   */
  allButton = () => {
    return (
      <button ref={all => this.all = all}>all</button>
    )
  }

  /**
   * Sort handler for button sort by name
   * @return {boolean}
   */
  sortByNameUpdate = (e) => {
    console.log('ssssdfsdfsdf', e.target.textContent);
    this.shuffle.filter(e.target.textContent)
  }

  sortByNameUpdate2 = (e) => {
    e.preventDefault();
    console.log('sdsdsdsd');
    this.shuffle.filter(Shuffle.ALL_ITEMS)
  }

  toggleSlide = () => {
    console.log('ggggg', this.slider);
    this.slider.classList.toggle('slider-closed');
  }

  render() {
    console.log('element', this.element)
    console.log('sizer', this.sizer)
    return (
      <div>
        {this.sortButton('@stickermule')}
        {this.allButton()}
        {/* <Btn onClick={() => this.shuffle.filter(Shuffle.ALL_ITEMS)} filter="all"/> */}
        {/* <Btnn onClick={this.sortByNameUpdate2()} filter="all"/> */}
        <button onClick={this.sortByNameUpdate} />
        <button onClick={this.sortByNameUpdate2} />
        {this.searchUI()}
        <div ref={element => this.element = element} className="row">
          {this.state.photos.map((image) => (
            <div key={image.id} className="col-md-4 photo-item" data-groups={`["${image.username}"]`}>
              <div className="aspect aspect--4x3">
                <div className="aspect__inner">
                  <img src={image.src}/>
                  {/* <PhotoAttribution username={image.username} name={image.name} /> */}
                  <p id={image.name} className="name">{image.name} - {image.username}</p>
                  <div>
                    <div id={image.id} ref={element => this.slider = element} className="slider">
                      <p>Blah Blah...</p>
                    </div>
                    <div onClick={this.toggleSlide}>Toggle</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={element => this.sizer = element} className="col-sm-1 col-1@xs col-1@sm photo-grid__sizer"></div>
        </div>
      </div>
    );
  }
}

export default SortFilter;

/**
 * A small badge with a link to the author of the photo's profile.
 * @param {{ username: string, name: string }} props Component props.
 * @return {JSX.Element}
 */
function PhotoAttribution({ username, name }) {
  if (!username) {
    return null;
  }

  const href = `https://unsplash.com/${username}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`;
  const title = `Download free do whatever you want high-resolution photos from ${name}`;
  return (
    <a className="photo-attribution" href={href} target="_blank" rel="noopener noreferrer" title={title}>
      <span>
        <svg viewBox="0 0 32 32">
          <path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path>
        </svg>
      </span>
      <span>{name}</span>
    </a>
  );
}

function Btnn(props) {
  return (
    <button onClick={props.onClick}>{props.filter}</button>
  )
}