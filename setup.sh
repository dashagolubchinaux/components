#!/bin/bash

# Nexar Design System - AI Rules Setup Script
# Downloads the design system rules file for your AI coding assistant

set -e

GITHUB_RAW_URL="https://raw.githubusercontent.com/dashagolubchinaux/components/main/nexar-design-system.md"
GITHUB_CSS_URL="https://raw.githubusercontent.com/dashagolubchinaux/components/main/nexar-theme.css"
GITHUB_FONTS_URL="https://raw.githubusercontent.com/dashagolubchinaux/components/main/fonts"
VERSION="1.4.0"

# Font files to download
FONTS=(
  "Hellix-Thin.otf"
  "Hellix-Light.otf"
  "Hellix-Regular.otf"
  "Hellix-Medium.otf"
  "Hellix-SemiBold.otf"
  "Hellix-Bold.otf"
  "Hellix-ExtraBold.otf"
  "Hellix-Black.otf"
  "Roobert-Light.otf"
  "Roobert-LightItalic.otf"
  "Roobert-Regular.otf"
  "Roobert-RegularItalic.otf"
  "Roobert-Medium.otf"
  "Roobert-MediumItalic.otf"
  "Roobert-SemiBold.otf"
  "Roobert-SemiBoldItalic.otf"
  "Roobert-Bold.otf"
  "Roobert-BoldItalic.otf"
  "Roobert-Heavy.otf"
  "Roobert-HeavyItalic.otf"
)

echo ""
echo "========================================"
echo "  Nexar Design System - AI Rules Setup"
echo "  Version: $VERSION"
echo "========================================"
echo ""

# Detect current directory
PROJECT_DIR=$(pwd)

# Check if this is an empty folder (no package.json)
if [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo "No project found. Creating Next.js app..."
  echo ""

  # Check if npx is available
  if ! command -v npx &> /dev/null; then
    echo "  ✗ npx not found. Please install Node.js first:"
    echo "    https://nodejs.org/"
    echo ""
    exit 1
  fi

  # Create Next.js project in current directory
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes

  echo ""
  echo "  ✓ Next.js project created"
fi

# Validate project structure
echo "Checking project requirements..."

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

# Install rules for ALL AI tools (user might switch between them)
echo "Installing AI rules for all supported tools..."

# Cursor
mkdir -p "$PROJECT_DIR/.cursor/rules"
curl -sL "$GITHUB_RAW_URL" -o "$PROJECT_DIR/.cursor/rules/nexar-design-system.mdc"
echo "  ✓ Cursor: .cursor/rules/nexar-design-system.mdc"

# Claude Code (VS Code extension)
curl -sL "$GITHUB_RAW_URL" -o "$PROJECT_DIR/CLAUDE.md"
echo "  ✓ Claude Code: CLAUDE.md"

# Windsurf
mkdir -p "$PROJECT_DIR/.windsurfrules"
curl -sL "$GITHUB_RAW_URL" -o "$PROJECT_DIR/.windsurfrules/nexar-design-system.md"
echo "  ✓ Windsurf: .windsurfrules/nexar-design-system.md"

echo ""

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

# Download fonts
echo "Downloading fonts..."
if [ -d "$PROJECT_DIR/src" ]; then
  mkdir -p "$PROJECT_DIR/src/styles/fonts"
  FONTS_PATH="src/styles/fonts"
else
  mkdir -p "$PROJECT_DIR/styles/fonts"
  FONTS_PATH="styles/fonts"
fi

for font in "${FONTS[@]}"; do
  curl -sL "$GITHUB_FONTS_URL/$font" -o "$PROJECT_DIR/$FONTS_PATH/$font"
done
echo "  ✓ Downloaded ${#FONTS[@]} font files to $FONTS_PATH/"

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

# Replace globals.css with clean Nexar version (removes Next.js defaults that conflict)
GLOBALS_FILE=""
if [ -f "$PROJECT_DIR/src/app/globals.css" ]; then
  GLOBALS_FILE="$PROJECT_DIR/src/app/globals.css"
  CSS_IMPORT="../styles/nexar-theme.css"
elif [ -f "$PROJECT_DIR/app/globals.css" ]; then
  GLOBALS_FILE="$PROJECT_DIR/app/globals.css"
  CSS_IMPORT="../styles/nexar-theme.css"
fi

if [ -n "$GLOBALS_FILE" ]; then
  echo "Configuring globals.css..."
  cat > "$GLOBALS_FILE" << EOF
@import "tailwindcss";
@import "$CSS_IMPORT";
EOF
  echo "  ✓ Updated globals.css (replaced Next.js defaults)"
else
  echo ""
  echo "Note: globals.css not found. Create it with:"
  echo '  @import "tailwindcss";'
  echo "  @import \"./$CSS_PATH\";"
fi

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Files created:"
echo "  • .cursor/rules/nexar-design-system.mdc"
echo "  • CLAUDE.md"
echo "  • .windsurfrules/nexar-design-system.md"
echo "  • $CSS_PATH (theme + fonts)"
echo "  • $FONTS_PATH/ (20 font files)"
echo "  • $COMPONENTS_PATH/ (for components)"
echo ""
echo "You're all set! Start building with your AI assistant."
echo ""
