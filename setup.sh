#!/bin/bash

# Nexar Design System - AI Rules Setup Script
# Downloads the design system rules file for your AI coding assistant

set -e

GITHUB_RAW_URL="https://raw.githubusercontent.com/dashagolubchinaux/components/main/nexar-design-system.md"
GITHUB_CSS_URL="https://raw.githubusercontent.com/dashagolubchinaux/components/main/nexar-theme.css"
VERSION="1.4.0"

echo ""
echo "========================================"
echo "  Nexar Design System - AI Rules Setup"
echo "  Version: $VERSION"
echo "========================================"
echo ""

# Detect current directory
PROJECT_DIR=$(pwd)

# Validate project structure
echo "Checking project requirements..."

# Check for React (package.json with react dependency)
if [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo "  ✗ No package.json found"
  echo ""
  echo "This doesn't appear to be a Node.js project."
  echo "Please run this from your project root, or create a new project:"
  echo "  npx create-next-app@latest my-app"
  echo ""
  exit 1
fi

# Check for React dependency
if ! grep -q '"react"' "$PROJECT_DIR/package.json"; then
  echo "  ✗ React not found in package.json"
  echo ""
  echo "This design system requires React. Add it to your project:"
  echo "  npm install react react-dom"
  echo ""
  exit 1
fi
echo "  ✓ React project detected"

# Check for Tailwind CSS
HAS_TAILWIND=false
if grep -q '"tailwindcss"' "$PROJECT_DIR/package.json" || [ -f "$PROJECT_DIR/tailwind.config.js" ] || [ -f "$PROJECT_DIR/tailwind.config.ts" ]; then
  HAS_TAILWIND=true
  echo "  ✓ Tailwind CSS detected"
else
  echo "  ! Tailwind CSS not detected (will be installed)"
fi

# Detect package manager
detect_package_manager() {
  if [ -f "$PROJECT_DIR/bun.lockb" ]; then
    echo "bun"
  elif [ -f "$PROJECT_DIR/pnpm-lock.yaml" ]; then
    echo "pnpm"
  elif [ -f "$PROJECT_DIR/yarn.lock" ]; then
    echo "yarn"
  else
    echo "npm"
  fi
}

PKG_MANAGER=$(detect_package_manager)
echo "  ✓ Package manager: $PKG_MANAGER"
echo ""

# Detect AI tool and set default location
if [ -d "$PROJECT_DIR/.cursor" ] || command -v cursor &> /dev/null; then
  DEFAULT_TOOL="cursor"
  DEFAULT_PATH=".cursor/rules/nexar-design-system.mdc"
elif [ -d "$PROJECT_DIR/.claude" ]; then
  DEFAULT_TOOL="claude"
  DEFAULT_PATH="CLAUDE.md"
elif [ -d "$PROJECT_DIR/.windsurfrules" ]; then
  DEFAULT_TOOL="windsurf"
  DEFAULT_PATH=".windsurfrules/nexar-design-system.md"
else
  DEFAULT_TOOL="cursor"
  DEFAULT_PATH=".cursor/rules/nexar-design-system.mdc"
fi

echo "Detected AI tool: $DEFAULT_TOOL"
echo "Installing rules to: $DEFAULT_PATH"
echo ""

# Create directory if needed
PARENT_DIR=$(dirname "$DEFAULT_PATH")
if [ "$PARENT_DIR" != "." ]; then
  mkdir -p "$PROJECT_DIR/$PARENT_DIR"
fi

# Download the rules file
echo "Downloading Nexar Design System rules..."
curl -sL "$GITHUB_RAW_URL" -o "$PROJECT_DIR/$DEFAULT_PATH"
echo "  ✓ Created $DEFAULT_PATH"

# Download CSS theme file
echo "Downloading theme styles..."
if [ -d "$PROJECT_DIR/src" ]; then
  mkdir -p "$PROJECT_DIR/src/styles"
  curl -sL "$GITHUB_CSS_URL" -o "$PROJECT_DIR/src/styles/nexar-theme.css"
  CSS_PATH="src/styles/nexar-theme.css"
else
  mkdir -p "$PROJECT_DIR/styles"
  curl -sL "$GITHUB_CSS_URL" -o "$PROJECT_DIR/styles/nexar-theme.css"
  CSS_PATH="styles/nexar-theme.css"
fi
echo "  ✓ Created $CSS_PATH"

# Create lib/utils.ts if it doesn't exist
if [ ! -f "$PROJECT_DIR/src/lib/utils.ts" ] && [ ! -f "$PROJECT_DIR/lib/utils.ts" ]; then
  echo "Creating utility function..."

  if [ -d "$PROJECT_DIR/src" ]; then
    mkdir -p "$PROJECT_DIR/src/lib"
    cat > "$PROJECT_DIR/src/lib/utils.ts" << 'EOF'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
    echo "  ✓ Created src/lib/utils.ts"
  else
    mkdir -p "$PROJECT_DIR/lib"
    cat > "$PROJECT_DIR/lib/utils.ts" << 'EOF'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
    echo "  ✓ Created lib/utils.ts"
  fi
fi

# Create components folder
if [ -d "$PROJECT_DIR/src" ]; then
  mkdir -p "$PROJECT_DIR/src/components/ui"
  COMPONENTS_PATH="src/components/ui"
else
  mkdir -p "$PROJECT_DIR/components/ui"
  COMPONENTS_PATH="components/ui"
fi
echo "  ✓ Created $COMPONENTS_PATH/"

# Install dependencies
echo ""
echo "Installing dependencies..."

DEPS="clsx tailwind-merge class-variance-authority @radix-ui/react-slot @phosphor-icons/react"

if [ "$HAS_TAILWIND" = false ]; then
  DEPS="tailwindcss $DEPS"
fi

case $PKG_MANAGER in
  bun)
    bun add $DEPS
    ;;
  pnpm)
    pnpm add $DEPS
    ;;
  yarn)
    yarn add $DEPS
    ;;
  *)
    npm install $DEPS
    ;;
esac

echo "  ✓ Dependencies installed"

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Files created:"
echo "  • $DEFAULT_PATH (AI rules)"
echo "  • $CSS_PATH (theme variables)"
echo "  • $COMPONENTS_PATH/ (for your components)"
echo ""
echo "Using a different AI tool? Move the rules file:"
echo "  • Cursor:      .cursor/rules/nexar-design-system.mdc"
echo "  • Claude Code: CLAUDE.md (project root)"
echo "  • Windsurf:    .windsurfrules/nexar-design-system.md"
echo ""
# Determine correct import path based on globals.css location
if [ -f "$PROJECT_DIR/src/app/globals.css" ]; then
  CSS_IMPORT="../styles/nexar-theme.css"
elif [ -f "$PROJECT_DIR/app/globals.css" ]; then
  CSS_IMPORT="../styles/nexar-theme.css"
else
  CSS_IMPORT="./$CSS_PATH"
fi

echo "Next step:"
echo "  Add this to your globals.css (after @import \"tailwindcss\"):"
echo "  @import \"$CSS_IMPORT\";"
echo ""
echo "Then start building! Ask your AI to create UI components."
echo ""
