# Cloud Platform Interface (CPI) Implementation Guide

Transform your container runtime into a standardized powerhouse with the Cloud Platform Interface specification. This comprehensive guide walks you through implementing a CPI for your container runtime while maintaining strict compliance with established patterns.

## 🎯 What is an OmniForge Container CPI?

The Cloud Platform Interface specification is a standardized way to integrate container runtimes into cloud platforms. It consists of four core components:
- Identifier fields
- Actions
- Default settings
- Validation requirements

## ❓ What about Director CPIs?

OmniForge has container and Director CPIs, Container CPIs are used to manage application instances in a runtime-agnostic, and easy to maintain way. Director CPIs are use by the OmniDirector to manage workers on your IAAS (Like VirtualBox, Bare Metal, AWS, Vsphere, etc). For more information on Director CPIs, see the cpi-director-spec docs.


## 🏗️ Basic Structure

Every CPI specification starts with this foundational structure:

```json
{
    "name": "runtime_name_cpi",
    "type": "container",
    "actions": {},
    "default_settings": {},
    "validation": {}
}
```

## ⚙️ Default Settings

Default settings provide a consistent environment across all containers. They're specified as key-value pairs:

```json
{
    "default_settings": {
        "restart_policy": "unless-stopped",
        "network_mode": "bridge",
        "logging_driver": "json-file",
        "logging_options": {
            "max-size": "100m",
            "max-file": "3"
        }
    }
}
```

## 🎮 Action Implementation

Actions are the heart of your CPI implementation. Each action requires:
- A command template using string substitution with curly braces
- A list of required parameters

### Example: Creating Containers

```json
{
    "create_container": {
        "command": "your-runtime create --name {name} --ports {ports} --env {env} {image}",
        "params": ["name", "image", "ports", "env"]
    }
}
```

### Complex Operations

Some actions may require preliminary steps. For instance, container deletion might need to stop the container first:

```json
{
    "delete_container": {
        "command": "your-runtime remove {name}",
        "params": ["name"],
        "pre_delete": [
            "your-runtime stop {name}"
        ]
    }
}
```

## 📝 Required Actions

Your CPI must implement these core operations:

### Container Management
- `create_container`
- `delete_container`
- `start_container`
- `stop_container`
- `restart_container`
- `inspect_container`
- `list_containers`
- `logs`
- `exec`

### Storage Operations
- `create_volume`
- `delete_volume`
- `attach_volume`

### Network Operations
- `create_network`
- `delete_network`
- `connect_network`
- `disconnect_network`

## ✅ Validation Requirements

Specify runtime prerequisites and version requirements:

```json
{
    "validation": {
        "required_commands": [
            "your-runtime"
        ],
        "version_requirements": {
            "your-runtime": ">=X.Y.Z"
        }
    }
}
```

## 🚀 Real-World Implementation: LXC Example

Let's explore a complete implementation using Linux Containers (LXC) as our runtime:

```json
{
    "name": "lxc_cpi",
    "type": "container",
    "actions": {
        "create_container": {
            "command": "lxc-create -n {name} -t download -- --dist {image}",
            "params": ["name", "image", "ports", "env"]
        },
        "delete_container": {
            "command": "lxc-destroy -n {name}",
            "params": ["name"],
            "pre_delete": [
                "lxc-stop -n {name}"
            ]
        },
        "start_container": {
            "command": "lxc-start -n {name}",
            "params": ["name"]
        },
        "exec": {
            "command": "lxc-attach -n {name} -- {cmd}",
            "params": ["name", "cmd"]
        },
        "logs": {
            "command": "cat /var/log/lxc/{name}.log",
            "params": ["name"]
        }
    },
    "default_settings": {
        "restart_policy": "always",
        "network_mode": "bridge",
        "logging_driver": "syslog",
        "logging_options": {
            "max-size": "100m",
            "max-file": "3"
        }
    },
    "validation": {
        "required_commands": [
            "lxc-create",
            "lxc-start",
            "lxc-stop",
            "lxc-destroy"
        ],
        "version_requirements": {
            "lxc": ">=4.0.0"
        }
    }
}
```

## 💡 Implementation Tips

### Parameter Handling
Remember that different runtimes handle parameters differently. OmniForge passes more parameters than typically needed to ensure compatibility with various command-line tools.

### Network Operations
Network handling can vary significantly between runtimes. Here's how LXC implements it:

```json
{
    "create_network": {
        "command": "lxc-network create {name}",
        "params": ["name"]
    },
    "connect_network": {
        "command": "lxc-network attach {network} {container_id}",
        "params": ["network", "container_id"]
    }
}
```

### Volume Management
Volume operations might require platform-specific CPIs when working with filesystem operations. For example:

```json
{
    "create_volume": {
        "command": "mkdir -p /var/lib/lxc/{name}/rootfs",
        "params": ["name"]
    },
    "attach_volume": {
        "command": "mount --bind {volume} /var/lib/lxc/{name}/rootfs/{mount_point}",
        "params": ["name", "volume", "mount_point"]
    }
}
```

## 🎯 Best Practices

1. **Command Mapping**: Thoroughly understand your target runtime's command structure before implementation
2. **Platform Compatibility**: Consider creating platform-specific CPIs for filesystem operations
3. **Version Control**: Clearly specify version requirements in the validation section
4. **Documentation**: Keep your CPI implementation well-documented for future maintenance

## 🔍 Next Steps

After implementing your CPI:
1. Test all required actions thoroughly
2. Document any runtime-specific quirks or requirements, add any prereqs to the setup_commands section so OmniForge can handle setup
3. Submit your implementation for review if you would like it included as a default CPI