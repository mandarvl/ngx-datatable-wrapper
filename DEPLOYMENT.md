# Deployment Instructions

Follow these steps to publish `@etsena/ngx-datatable-wrapper` to the public NPM registry.

## Prerequisites

1.  **NPM Account**: Ensure you have an account on [npmjs.com](https://www.npmjs.com/).
2.  **Login**: Login to your NPM account via the CLI:
    ```bash
    npm login
    ```

## Step-by-Step Deployment

### 1. Build the Library

Run the build command from the root of the workspace:

```bash
ng build ngx-datatable-wrapper --configuration production
```

This will generate the production-ready bundle in the `dist/ngx-datatable-wrapper` directory.

### 2. Navigate to the Build Output

```bash
cd dist/ngx-datatable-wrapper
```

### 3. Publish to NPM

If this is a new package or you are publishing it publicly under a scope (`@etsena`), use the following command:

```bash
npm publish --access public
```

For subsequent updates, ensure you increment the version in `projects/ngx-datatable-wrapper/package.json` before building.

## Troubleshooting

- **Version Mismatch**: Ensure the version in `package.json` is unique and higher than the currently published version.
- **Authentication**: If you get a 403 error, verify you are logged in and have the necessary permissions for the `@etsena` scope or the package name.
- **Private Registry**: If you intend to publish to a private registry, update the `publishConfig` in `package.json`.
