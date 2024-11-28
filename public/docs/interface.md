
# ❓ Interfacing with Omni-forge

---

## 🔎 Overview
See the [Introduction](getting-started) page for more information on each specific component in the stack. For reference, here's a quick overview of Omni-forge's core components:
* Omni-forge
    * The core orchestration platform that manages the entire infrastructure lifecycle
    * Handles service discovery, load balancing, and high-level system coordination
    * Provides the central control plane for all Omni components
* Omni-Director
    * Orchestrates container deployment and lifecycle management
    * Manages scaling operations and resource allocation
    * Handles service health monitoring and failover
* Omni-Agent
    * Runs on each node in the infrastructure
    * Executes container operations and reports node status
    * Manages local resources and maintains container health
* Omni-CLI
    * Command-line interface for interacting with the Omni-forge ecosystem
    * Provides user-friendly commands for deployment and management
    * Offers monitoring and troubleshooting capabilities

> 💡 **Tip**: Omni-CLI is the main user-facing manager for the rest of the stack, everything else is automatically managed by internal health monitoring, incident response, and lifecycle management!

---

## 💬 Terminology

### 🏢 IAAS (Infastructure As A Service)

Infrastructure as a Service (IaaS) platforms are those that provide virtualized computing resources over the internet. They can be managed or in-house self hosted, and deliver computing, storage, and networking resources on-demand, allowing organizations to scale their IT infrastructure without managing physical hardware.

Common examples include:
* Amazon EC2 (Elastic Compute Cloud)
* Microsoft Azure Virtual Machines
* Google Compute Engine
* VMWare VSphere
* OpenStack

### 📜 CPI (Cloud Provider Interface)
A standardized specification that defines how infrastructure management tools interact with different container runtimes or cloud providers. It serves as a universal blueprint that translates high-level operations into platform-specific commands, enabling consistent infrastructure management across diverse environments without needing to modify the application code on a per-platform basis.

### 🌐 API (Application Programming Interface)
A carefully structured communication protocol that enables different software components to interact seamlessly. Unlike traditional interfaces that connect users with applications, APIs connect applications with other applications, defining the methods and data formats they can use to request and exchange information. Think of it as a digital contract that specifies how different pieces of software can work together effectively.

## 🔀 How it works in practice
The Cloud Platform Interface (CPI) acts as a translation layer between services, allowing them to communicate effectively through their APIs. As data flows between services and reaches either the Director or Agent components, these components often need to perform specific infrastructure actions like creating containers or setting up new workers.

Rather than hardcoding commands for each possible runtime, or IAAS the service checks its CPI specification file; a JSON configuration that maps standardized requests to runtime-specific commands. This approach means that no matter your backend technologies the same API request gets translated into the correct command for your specific environment. CPIs function as a universal translator that ensures your infrastructure requests get executed properly, regardless of the underlying technology being used.

![](/doc-images/interface/OmniInPractice.drawio.png)

---

