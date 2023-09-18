# ui-automation

## Important note!!!

Since this repository is run for DRA and all the DRAFE pipelines, it is critical that
the `main` branch be passing at all times - MAKE SURE YOUR BRANCH PR BUILD PASSES - do NOT just
merge the PR regardless.

Also - since this pipeline runs after QA deploys of any DRA/DRAFE pipeline, pushing to Stage will take
longer - as long as it takes to run this pipeline. So, try to avoid very long tests.

## Prerequisites

- Node JS

## How to Run Test Cases locally

We use a "generic" user, whose credentials are stored in Cerberus (`a.DRA.DraAutomation`). So, when this
runs in the pipeline, the `USER_NAME` and `PASSWORD` environment variables are populated.

If you don’t have access to Cerberus to get the credentials, I’ve also stored them in the pre-prod
WaffleIron AWS account’s Secrets Manager, under the key of `ui-automation-user-credentials`

You can run it locally, but you'll have to specify the values like so:

- Populate an `.env` file - THIS IS IGNORED IN SOURCE CONTROL - with the values. It might look this:

```bash
USER_NAME = 
PASSWORD = 
ENVIRONMENT = 
```

This would run the app using the `local` config as defined in the `env.ts` file.

- Run the testcases as shown below (Alternately, you can use your IDE to run specific tests)

```
yarn install
yarn test:chrome
```

## Running headless

The CI pipeline doesn't have a UI, so we have to run in "headless" mode, where there is no screen visible. This is the

```
yarn test:chrome:headless
```

## Capture video

We can capture video (it goes into the `./videos` folder) by running

```
yarn test:chrome:headless:video
```

## Run locally with the same Docker image the pipeline uses
Use the `runDockerTests.sh` script to start the Docker container used by the pipeline - this lets you easily mimic any issues the pipeline might be having.

## Pipeline issues
### Video doesn't show (blank)

Jenkins has some stuff disabled by default - but this can be overridden. Unfortunately, when Jenkins is updated, this will have to be re-done.

- Go to "Manage Jenkins"
- Click on the "Script Console" icon
- Enter the following and run it:

```
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "media-src 'self';")
```

Now videos will show properly.
