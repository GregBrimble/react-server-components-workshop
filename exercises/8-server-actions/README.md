# 7 Smart Placement

## Goals

1. Learn about Smart Placement and when it should be enabled
1. Enable Smart Placement on our `region-worker`

## Instructions

**Make sure you're in the `./exercises/7-smart-placement` directory!**

1.  Enable Smart Placement in our `region-worker` by adding a `placement` section to our `wrangler-region.toml` file:

    ```toml
    # ./wrangler-region.toml

    name = "region-worker"
    main = "./dist-region/index.js"
    compatibility_date = "2023-11-09"
    compatibility_flags = ["nodejs_compat"]

    [placement]
    mode = "smart"

    [[d1_databases]]
    binding = "DB"
    database_name = "rsc-workshop"
    database_id = "ab0d1bb7-0640-4bc2-9e6f-9f663bed2654" # REPLACE THIS WITH YOUR ID!
    migrations_dir = "./migrations"

    ```

1.  Deploy it again by running `npm run deploy`.
