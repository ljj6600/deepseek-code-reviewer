# CLAUDE.md - Project Context for AI Assistant

## Project Overview

- **Project Name**: deepseek-code-reviewer
- **Type**: Claude Code / Cline Plugin (Node.js)
- **Core Functionality**: AI-powered code review using DeepSeek API
- **Target Users**: Developers using Claude Code / Cline for coding
- **Author**: ljj6600

## Architecture

```
deepseek-code-reviewer/
├── index.js        # Plugin entry point + CLI
├── api.js          # DeepSeek API integration
├── review.ts       # Code review logic
├── config.ts       # Configuration management
├── prompts.ts      # Prompt templates
├── package.json
├── README.md
└── CLAUDE.md
```

## Key Files

| File | Purpose |
|------|---------|
| `api.js` | Handles DeepSeek API calls |
| `review.js` | Core review logic and analysis |
| `config.js` | API key and settings management |
| `prompts.js` | Review prompt templates |
| `index.js` | CLI entry point |

## Commands

- `node index.js review "<code>" [language]` - Review code
- `node index.js set-key <api-key>` - Set API key
- `node index.js config` - Show configuration
- `node index.js reset` - Reset configuration

## Configuration

Set `DEEPSEEK_API_KEY` environment variable or use:
```bash
node index.js set-key your-api-key
```

Config file: `~/.deepseek-code-reviewer.json`