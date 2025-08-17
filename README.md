# @astrojs/lit 🔥

This **[Astro integration][astro-integration]** enables server-side rendering and client-side hydration for your [Lit](https://lit.dev/) custom elements.

## ⚠️ Fork Notice

**This is a community-maintained fork of the original `@astrojs/lit` integration.**

The original `@astrojs/lit` integration was officially deprecated by the Astro team. This fork aims to continue providing Lit support for Astro projects by maintaining and improving upon the original codebase.

**Important points:**

-   The original code was created and maintained by the Astro team
-   This fork is now maintained by [@manujoz](https://github.com/manujoz)
-   All credit for the original implementation goes to the Astro Core team
-   This version may include bug fixes and improvements not present in the deprecated version

## Installation

To install the package, run:

```bash
npm install mjo-astro-lit
```

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

```js
import { defineConfig } from "astro/config";
import lit from "mjo-astro-lit";

export default defineConfig({
    vite: {
        resolve: {
            alias: {
                "@astrojs/lit": "mjo-astro-lit",
            },
        },
    },
    integrations: [lit()],
});
```

## Support

-   For issues specific to this fork, please submit bug reports and feature requests as [GitHub issues][fork-issues] in this repository.
-   For general Astro questions, you can get help in the [Astro Discord][discord]. Post questions in our `#support` forum.
-   Check our [Astro Integration Documentation][astro-integration] for more on integrations.

## Contributing

This package is now maintained by [@manujoz](https://github.com/manujoz) as a community fork. You're welcome to submit an issue or PR!

**Note:** This is a fork of the original `@astrojs/lit` integration that was deprecated by the Astro Core team. All original credit goes to the Astro team.

## License

MIT

Copyright (c) 2023–present [Astro][astro]

[astro]: https://astro.build/
[docs]: https://docs.astro.build/en/guides/integrations-guide/lit/
[fork-issues]: https://github.com/manujoz/-mjo-astro-lit/issues
[contributing]: https://github.com/withastro/astro/blob/main/CONTRIBUTING.md
[coc]: https://github.com/withastro/.github/blob/main/CODE_OF_CONDUCT.md
[community]: https://github.com/withastro/.github/blob/main/COMMUNITY_GUIDE.md
[discord]: https://astro.build/chat/
[issues]: https://github.com/withastro/astro/issues
[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/
