# Quick start
Welcome to OmniCloud! Your one-click solution to deploy anything at scale. OmniCloud is designed to work out-of-the-box with minimal configuration, and can inspect, scan, build, deploy, and lifecycle manage your applications at massive scales without you lifting a finger. Its designed to be extremely user friendly while causing near-zero overhead. Omni supports everything from running VM workers in which your app ontainers run to working with bare metal hardware directly for maximum efficiency.

## Overview

In this guide, we'll walk you through the steps to get started with OmniCloud. By the end of this start, you'll have deployed your first application using our platform.

## Step 1: Install the CLI

First, you'll need to install the OmniCloud CLI. You can download it from our [installation page](https://github.com/Omni-Forge/Omni-CLI/releases/latest).

### Install using Package Managers

#### Using Grip
```bash
# All Platforms
sudo grip install omni-cli
```

#### Using Comet
```bash
# All platforms
comet install omni-meta 
```

### Source installation
Omni-CLI requires the following dependencies:
* [Rust Language](https://rustup.rs/)
* CC (or a linker of your choice)


if you are on the following platforms you can instal these dependencies
by running a command coresponding to your systems package manager

**Debian/ubuntu**:
```bash
sudo apt update && sudo apt install omni-meta
```

**Fedora/Redhat**:
```bash
sudo dnf update && sudo dnf install omni-meta
```

**Archlinux**:
```bash
sudo pacman -Syyu omni-meta # or your AUR helper of choice
```

**Using Comet ☄️ (Universal)**
```bash
comet install omni-meta --build-deps # or -b
```

After installing the dependencies:
```bash
# Clone the repo
git clone https://github.com/Omni-Forge/Omni-CLI

# Move into the repo
cd ./Omni-CLI/

# build the CLI
cargo build --release

# Copy the CLI to your path
cp ./target/release/omni-cli /user/local/bin/omni-cli
```

Verify that omni-cli is actually installed by running it. It should look something like this:
```bash
   ____                  _ ______
  / __ \____ ___  ____  (_) ____/___  _________ ____
 / / / / __ `__ \/ __ \/ / /_  / __ \/ ___/ __ `/ _ \
/ /_/ / / / / / / / / / / __/ / /_/ / /  / /_/ /  __/
\____/_/ /_/ /_/_/ /_/_/_/    \____/_/   \__, /\___/
                                        /____/

Welcome to OmniCloud - Modern Development Environment
Version 1.0.0


AVAILABLE COMMANDS:
  up Deploy your application
  push Push images to registry
  scale Scale application components
  logs View application logs
  status Check application status
  rollback Rollback to previous version
  config Manage application configuration

Use --help with any command for more information.
```

If so, you are ready to move on!
## Step 2 Install the server(s)

### OmniMicro (for local testing)

#### Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

#### Deploy OmniMicro

```bash
# Clone the repo
git clone https://github.com/Omni-Forge/OmniMicro

# move to into the repo
cd ./OmniMicro

# Move into one of the deployment modes (prod, dev, source)
cd ./omni-prod

# Install and start the stack
docker-coompose up -d
```

### Full Omni Deploy (For large scale / Production)

```bash
# Clone the repo
git clone https://github.com/Omni-Forge/Omni-Up

# move to into the repo
cd ./Omni-Up

# open the cluster config
nano ./forge-cluster.json
```

```bash


--- More docs coming soon! ---


```


## Step 3: Authenticate

Next, authenticate with your OmniCloud server.

```bash
OmniCloud login
```

## Step 4: Deploy Your Application

Deploy your application with a single command.

```bash
OmniCloud up
```

## Step 4: Monitor Your Deployment

You can monitor the status of your deployment using the CLI.

```bash
OmniCloud status
```

## Next Steps

Congratulations! You've successfully deployed your first application with OmniCloud. Explore our [documentation](../introduction) to learn more about advanced features and capabilities.