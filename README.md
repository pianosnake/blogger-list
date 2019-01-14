# &lt;blogger-list&gt;

A Web Component/HTML element that creates a standard HTML `<list>` from Blogger posts. Features include querying by labels, date ordering, and result limits.

## Install


In your webpage import `blogger-list.js` script in the HEAD tag.

```
<script src="//pianosnake.github.io/blogger-list/blogger-list.js"></script>
```

## Use

Obtain your blog ID and API key (See <https://developers.google.com/blogger/docs/3.0/using#APIKey>) and use them as values for the `blog-id` and `api-key` attributes. Both of these attributes are required.

List one or more comma separated labels in the `labels` attribute.

Blog posts are shown in descending order, with the last post first. Add an `asc` attribute if you'd like the list to be ordered in ascending order.

The default `max-results` attribute is set to 50. Add this attribute to overwrite the default.
```
<blogger-list labels="label1,label2" blog-id="xxx" api-key="xxx" asc max-results=4></blogger-list>
```
