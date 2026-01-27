# AI Daily News - Usage Notes

## Optional Script Dependencies

The `format_report.py` script has optional dependencies for enhanced functionality:

### Basic HTML conversion
```bash
pip install markdown
```

### PDF generation
```bash
pip install weasyprint
```

## Script Usage

### Format report to HTML
```bash
python scripts/format_report.py report.md --format html --output report.html
```

### Format report to PDF
```bash
python scripts/format_report.py report.md --format pdf --output report.pdf
```

### Format for email
```bash
python scripts/format_report.py report.md --format email --output email.html
```

## Customization Tips

### Adjusting Report Depth
- For executive summaries: Focus on "Today's Headlines" and "Looking Ahead" sections
- For technical audiences: Expand "Models & Research" and include more technical details
- For business audiences: Emphasize "Industry Updates" and "Applications & Insights"

### Language Localization
The skill can generate reports in multiple languages. Simply request in your preferred language:
- "Generate today's AI news report in Chinese"
- "Create an AI daily digest in Spanish"

### Date Ranges
- Daily: "Generate today's AI news report"
- Weekly: "Create a weekly AI news digest for last week"
- Custom: "Summarize AI news from January 15-20"

### Focus Areas
Request domain-specific reports:
- "Generate AI news focused on healthcare applications"
- "Create a report on LLM developments only"
- "Summarize AI news relevant to financial services"
