This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Update Page Data

- Generate page needed data

The ccc Ukraine projects is a static page. Although all the page data comes from a google sheet (listed below) and then turn into a json file (check document for the link) We have to put json object into the script/raw-data.json and then run `node script/raw-data-converter.js` to generate all page-necessary data inside datas/pages.json.

For the limit of the all types of page are using the same key inside google sheet (order, type, name, filename, text).
Page type like 'L' and 'E' should be handled manually inside the file script/raw-data-converter.js. Simply ignore the object from the json and insert all texts one by one to fit the the `firstPage` and `lastPage` objects inside raw-data-converter.js. Remember to run `node script/raw-data-converter.js` agagin to generate new page-needed data.

- Export static page and upload to GCS bucket by gsutil

The project leverages the next.js framework to export the static html files which will be uploaded to GCS bucket for the mirrormedia routing to render as a project page.

run `yarn export` to export static html files.

for dev (no cache version):
gsutil -h "Cache-Control:no-store" -m cp -r -a public-read ./out/\* gs://statics.mirrormedia.mg/projects/{project_name}

for prod:
gsutil -m cp -r -a public-read ./out/\* gs://statics.mirrormedia.mg/projects/{project_name}

- Clean dev projects after prod release

Remove the project uploaded for dev testing in the GCS bucket.

### References

- Google sheet example: (link)[https://docs.google.com/spreadsheets/d/1JXyySvrM-aJhUMvzUsL7ifyjvw6VJCKGdY9yVWBHfXE/edit#gid=0]
