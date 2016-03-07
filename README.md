# &lt;blogger-list&gt;

A [Polymer](https://www.polymer-project.org) based HTML element that creates an HTML list from Blogger posts. Features include querying by labels and ordering.

## Install

Install `<blogger-list>` HTML element using [Bower](http://bower.io/)

	bower install blogger-list

In your webpage import the webcomponents.js polyfill (for Firefox support) and link `blogger-list.html` in the HEAD tag.

	<script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
	<link rel="import" href="bower_components/blogger-list/blogger-list.html">
	
## Use

Obtain your blog ID and API key (See <https://developers.google.com/blogger/docs/3.0/using#APIKey>) and use them as values for the `blog-id` and `api-key` attributes. Both of these attributes are required.

List one or more comma separated labels in the `labels` attribute.

The displayed items are shown in descending order, with the last post first. Add an `asc` attribute if you'd like the list to be ordered in ascending order.

The default `max-results` attribute is set to 50. Add this attribute to overwrite the default.

	<blogger-list labels="label1,label2" blog-id="xxx" api-key="xxx" asc max-results=4></blogger-list>