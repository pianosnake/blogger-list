(function () {
  async function fetchPosts(url){
    const response = await fetch(url);
    const posts = await response.json();

    return (posts.items);
  }

  class BloggerList extends HTMLElement {
    async connectedCallback() {
      this.blogId = this.getAttribute('blog-id');
      this.apiKey = this.getAttribute('api-key');
      this.maxResults = this.getAttribute('max-results') || 50;
      this.labels = this.getAttribute('labels');
      this.asc = this.hasAttribute('asc');

      if(!this.blogId) {
        throw new Error("\<blogger-list\> blog-id is required");
      }
      if(!this.apiKey){
        throw new Error("\<blogger-list\> api-key is required");
      }

      const url = this.labels ? this._getPostsByLabelUrl() : this._getPostsUrl();

      const list = document.createElement("list");
      // not using the shadow dom because we want to style the element from outside
      this.appendChild(list);

      const posts = await fetchPosts(url);

      posts
      .sort(this._sort.bind(this))
      .filter(this._filter.bind(this))
      .forEach(post => {
        const item = document.createElement('li');
        item.innerHTML= `<a href=${post.url}>${post.title}</a>`;
        list.appendChild(item);
      })
    }

    _bloggerUrl(path, params){
      let url = `https://www.googleapis.com/blogger/v3/blogs/${this.blogId}/${path}?fields=items(title,url,published)&key=${this.apiKey}`;

      if(this.maxResults){
        url += `&maxResults=${this.maxResults}`; //does not work with labels query but _filter() will limit displayed results
      }

      if(params){
        for(var i in params){
          url += `&${i}=${params[i]}`;
        }
      }
      return url;
    }

    _getPostsUrl(){
      return this._bloggerUrl("posts");
    }

    _getPostsByLabelUrl(){
      //multiple label query looks like this q=label:pasta|label:pizza
      var labelsQuery = "label:" + this.labels.split(",").join("|label:");
      return this._bloggerUrl("posts/search",{
        q: labelsQuery
      });
    }

    _filter(i, idx){
      return idx < this.maxResults;
    }

    _sort(a, b){
      var aDate = new Date(a.published);
      var bDate = new Date(b.published);

      if(this.asc){
        return aDate < bDate ? -1 : 1;
      }else{
        return aDate < bDate ? 1 : -1;
      }
    }
  }

  customElements.define('blogger-list', BloggerList);
})();
