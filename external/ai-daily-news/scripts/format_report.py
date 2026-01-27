#!/usr/bin/env python3
"""
AI Daily News Report Formatter

This script formats AI news reports into different output formats (HTML, PDF, email).
Usage: python format_report.py <input.md> --format <html|pdf|email> --output <output_file>
"""

import argparse
import sys
from datetime import datetime
from pathlib import Path

try:
    import markdown
    from markdown.extensions import tables, fenced_code, toc
    MARKDOWN_AVAILABLE = True
except ImportError:
    MARKDOWN_AVAILABLE = False
    print("Warning: markdown package not installed. HTML conversion will be limited.")
    print("Install with: pip install markdown")


def read_markdown_file(filepath):
    """Read markdown content from file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)


def convert_to_html(markdown_content):
    """Convert markdown to HTML with styling."""
    if not MARKDOWN_AVAILABLE:
        # Basic fallback conversion
        html_content = markdown_content.replace('\n\n', '</p><p>').replace('\n', '<br>')
        html_content = f"<p>{html_content}</p>"
    else:
        # Use markdown library with extensions
        md = markdown.Markdown(extensions=['tables', 'fenced_code', 'toc'])
        html_content = md.convert(markdown_content)
    
    # Add CSS styling
    html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Daily News Report</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            background-color: #f5f5f5;
        }}
        .container {{
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #1a1a1a;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }}
        h2 {{
            color: #2c3e50;
            margin-top: 30px;
            border-left: 4px solid #4CAF50;
            padding-left: 15px;
        }}
        h3 {{
            color: #34495e;
            margin-top: 20px;
        }}
        strong {{
            color: #2c3e50;
        }}
        a {{
            color: #3498db;
            text-decoration: none;
        }}
        a:hover {{
            text-decoration: underline;
        }}
        ul, ol {{
            padding-left: 25px;
        }}
        li {{
            margin-bottom: 10px;
        }}
        hr {{
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 30px 0;
        }}
        .meta {{
            color: #7f8c8d;
            font-size: 0.9em;
            margin-bottom: 20px;
        }}
        code {{
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }}
        pre {{
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }}
        .footer {{
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #7f8c8d;
            font-size: 0.9em;
            text-align: center;
        }}
    </style>
</head>
<body>
    <div class="container">
        {html_content}
        <div class="footer">
            Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        </div>
    </div>
</body>
</html>"""
    
    return html_template


def convert_to_email(markdown_content):
    """Convert markdown to email-friendly HTML."""
    # Simplified HTML for email clients
    html_content = convert_to_html(markdown_content)
    
    # Email-specific template with inline styles
    email_template = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    {html_content}
</body>
</html>"""
    
    return email_template


def convert_to_pdf(markdown_content, output_path):
    """Convert markdown to PDF (requires additional dependencies)."""
    try:
        # Try using weasyprint
        from weasyprint import HTML
        html_content = convert_to_html(markdown_content)
        HTML(string=html_content).write_pdf(output_path)
        return True
    except ImportError:
        print("Error: PDF conversion requires weasyprint.")
        print("Install with: pip install weasyprint")
        return False
    except Exception as e:
        print(f"Error converting to PDF: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description='Format AI Daily News reports into different output formats'
    )
    parser.add_argument('input', help='Input markdown file path')
    parser.add_argument(
        '--format',
        choices=['html', 'pdf', 'email'],
        default='html',
        help='Output format (default: html)'
    )
    parser.add_argument(
        '--output',
        help='Output file path (default: input filename with new extension)'
    )
    
    args = parser.parse_args()
    
    # Read input file
    markdown_content = read_markdown_file(args.input)
    
    # Determine output path
    if args.output:
        output_path = args.output
    else:
        input_path = Path(args.input)
        if args.format == 'html' or args.format == 'email':
            output_path = input_path.with_suffix('.html')
        elif args.format == 'pdf':
            output_path = input_path.with_suffix('.pdf')
    
    # Convert based on format
    try:
        if args.format == 'html':
            html_content = convert_to_html(markdown_content)
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f"✓ HTML report generated: {output_path}")
            
        elif args.format == 'email':
            email_content = convert_to_email(markdown_content)
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(email_content)
            print(f"✓ Email-friendly HTML generated: {output_path}")
            
        elif args.format == 'pdf':
            if convert_to_pdf(markdown_content, output_path):
                print(f"✓ PDF report generated: {output_path}")
            else:
                sys.exit(1)
                
    except Exception as e:
        print(f"Error generating output: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
