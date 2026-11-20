# Mehmet Mert Seyhan, 23000007247
"""Generate the full field guide from README.md and compile its LaTeX source."""

from __future__ import annotations

import argparse
import hashlib
import os
from pathlib import Path
import re
import shutil
import subprocess
from xml.sax.saxutils import escape as xml_escape

ROOT = Path(__file__).resolve().parent.parent
LATEX = ROOT / "latex"
TEX = LATEX / "destructuring-guide.tex"
PDF = LATEX / "destructuring-guide.pdf"

PREAMBLE = r'''% Mehmet Mert Seyhan, 23000007247
% Generated from the complete README.md by build_guide.py.
\documentclass[10pt,a4paper]{article}
\usepackage[margin=21mm,headheight=14pt]{geometry}
\usepackage{fontspec}
\setmainfont{lmroman10-regular.otf}[
  BoldFont=lmroman10-bold.otf,
  ItalicFont=lmroman10-italic.otf,
  BoldItalicFont=lmroman10-bolditalic.otf]
\setsansfont{lmsans10-regular.otf}[BoldFont=lmsans10-bold.otf]
\setmonofont{lmmono10-regular.otf}
\IfFontExistsTF{Segoe UI Symbol}
  {\newfontfamily\bookfont{Segoe UI Symbol}}
  {\newfontfamily\bookfont{Noto Sans Symbols 2}}
\usepackage[table]{xcolor}
\definecolor{ink}{HTML}{173345}
\definecolor{accent}{HTML}{156879}
\definecolor{codebg}{HTML}{F4F6F7}
\definecolor{rulecolor}{HTML}{CDD8DE}
\usepackage{microtype}
\usepackage{listings}
\usepackage{upquote}
\usepackage{booktabs,longtable,array}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage{needspace}
\usepackage{xurl}
\usepackage{hyperref}
\hypersetup{colorlinks=true,linkcolor=ink,urlcolor=accent,
  pdftitle={Destructuring Field Guide},pdfauthor={Mehmet Mert Seyhan},
  bookmarksnumbered=true,bookmarksopen=false}
\urlstyle{same}
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\sffamily\small\color{ink}DESTRUCTURING FIELD GUIDE}
\fancyhead[R]{\sffamily\small SEN0415 / FALL 2026}
\fancyfoot[L]{\sffamily\footnotesize Mehmet Mert Seyhan / 23000007247}
\fancyfoot[R]{\sffamily\footnotesize\thepage}
\renewcommand{\headrulewidth}{0.3pt}
\titleformat{\section}{\Large\sffamily\bfseries\color{ink}}{\thesection}{0.7em}{}
\titleformat{\subsection}{\large\sffamily\bfseries\color{ink}}{\thesubsection}{0.7em}{}
\titleformat{\subsubsection}{\normalsize\sffamily\bfseries\color{ink}}{}{0pt}{}
\titlespacing*{\section}{0pt}{20pt}{9pt}
\titlespacing*{\subsection}{0pt}{15pt}{7pt}
\titlespacing*{\subsubsection}{0pt}{12pt}{6pt}
\setlength{\parindent}{0pt}
\setlength{\parskip}{5pt}
\setlength{\emergencystretch}{3em}
\setcounter{tocdepth}{1}
\setcounter{secnumdepth}{2}
\setlist{nosep,leftmargin=1.4em,topsep=4pt}
\lstdefinelanguage{GuideJS}{
  keywords={const,let,var,function,return,if,else,for,of,in,new,try,catch,
    finally,yield,type,export,default,import,from,extends,infer,readonly,
    number,string,boolean,undefined,null,true,false},
  sensitive=true,morecomment=[l]{//},morecomment=[s]{/*}{*/},
  morestring=[b]',morestring=[b]"}
\lstdefinestyle{guide}{
  basicstyle=\ttfamily\fontsize{8.2}{10.2}\selectfont,
  keywordstyle=\color{accent}\bfseries,
  commentstyle=\color{gray},stringstyle=\color{ink},
  backgroundcolor=\color{codebg},frame=l,rulecolor=\color{rulecolor},
  framerule=1pt,xleftmargin=2mm,xrightmargin=1mm,framesep=5pt,
  columns=fullflexible,keepspaces=true,showstringspaces=false,
  breaklines=true,breakatwhitespace=false,tabsize=2,upquote=true,
  aboveskip=7pt,belowskip=8pt,
  postbreak=\mbox{\textcolor{gray}{\tiny$\hookrightarrow$}\space},
  escapeinside={(*@}{@*)}}
\lstset{style=guide}
\newcolumntype{L}[1]{>{\raggedright\arraybackslash}p{#1}}
\begin{document}
\hypersetup{pageanchor=false}
\begin{titlepage}
\vspace*{20mm}
{\sffamily\large\color{accent}SEN0415 / ADVANCED WEB PROGRAMMING\par}
\vspace{10mm}
{\sffamily\Huge\bfseries\color{ink}Destructuring\\[3mm]Field Guide\par}
\vspace{7mm}
{\Large JavaScript, TypeScript and React\par}
\vspace{12mm}
{\color{rulecolor}\hrule height 1pt}
\vspace{9mm}
{\large Mehmet Mert Seyhan\par}
{\large 23000007247\par}
\vspace{4mm}
{\sffamily Assignment 4 / Fall 2026\par}
\vfill
The complete guide, with source examples, recorded output, experiments,
real-project analysis and the work log. Generated from README.md.
\end{titlepage}
\hypersetup{pageanchor=true}
\pagenumbering{roman}
\tableofcontents
\clearpage
\pagenumbering{arabic}
'''


def escape(text: str) -> str:
    mapping = {
        "\\": r"\textbackslash{}", "{": r"\{", "}": r"\}",
        "$": r"\$", "&": r"\&", "#": r"\#", "%": r"\%",
        "_": r"\_", "~": r"\textasciitilde{}", "^": r"\textasciicircum{}",
        "📚": r'{\bookfont\symbol{"1F4DA}}',
    }
    return "".join(mapping.get(c, c) for c in text)


def inline(text: str, heading: bool = False) -> str:
    """Handle the inline Markdown forms used in this guide, preserving text."""
    token = re.compile(r"(`[^`]+`|\*\*.+?\*\*|\[[^\]]+\]\([^\s)]+\))")
    result = []
    cursor = 0
    for match in token.finditer(text):
        result.append(escape(text[cursor:match.start()]))
        value = match.group()
        if value.startswith("`"):
            raw = value[1:-1]
            pieces = []
            for i, char in enumerate(raw):
                pieces.append(escape(char))
                if char in "/\\._,:;|=" or (
                    i + 1 < len(raw) and char.islower() and raw[i + 1].isupper()
                ):
                    pieces.append(r"\allowbreak{}")
            rendered = r"\texttt{" + "".join(pieces) + "}"
            if heading:
                rendered = r"\texorpdfstring{" + rendered + "}{" + escape(raw) + "}"
            result.append(rendered)
        elif value.startswith("**"):
            result.append(r"\textbf{" + inline(value[2:-2], heading) + "}")
        else:
            link = re.fullmatch(r"\[([^\]]+)\]\(([^\s)]+)\)", value)
            assert link
            result.append(r"\href{" + escape(link[2]) + "}{" + inline(link[1], heading) + "}")
        cursor = match.end()
    result.append(escape(text[cursor:]))
    return "".join(result)


def table(lines: list[str]) -> str:
    rows = [[cell.strip() for cell in line.strip().strip("|").split("|")]
            for line in lines]
    header, separator, *body = rows
    assert all(re.fullmatch(r":?-+:?", cell) for cell in separator)
    count = len(header)
    assert all(len(row) == count for row in body)
    if count == 4 and header[:2] == ["Case", "Source"]:
        widths = [0.07, 0.56, 0.13, 0.18]
    else:
        widths = [0.17, 0.23, 0.27, 0.27] if count == 4 else [0.94 / count] * count
    spec = "@{}" + "".join(f"L{{{w:.3f}\\linewidth}}" for w in widths) + "@{}"
    header_line = " & ".join(r"\textbf{" + inline(c) + "}" for c in header) + r" \\"
    chunks = ([r"\Needspace{12\baselineskip}"] if len(body) <= 6 else [])
    chunks += [r"\begingroup\footnotesize\setlength{\tabcolsep}{3pt}",
              r"\renewcommand{\arraystretch}{1.25}",
              r"\begin{longtable}{" + spec + "}", r"\toprule", header_line,
              r"\midrule\endfirsthead", r"\toprule", header_line,
              r"\midrule\endhead", r"\bottomrule\endfoot"]
    chunks += [" & ".join(inline(cell) for cell in row) + r" \\[3pt]" for row in body]
    chunks += [r"\end{longtable}", r"\endgroup"]
    return "\n".join(chunks)


def convert(markdown: str) -> str:
    lines = markdown.splitlines()
    chunks = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("# ") or line.startswith("Name:") or line.startswith("Student number:"):
            i += 1  # Already represented on the cover.
            continue
        if line.startswith("```"):
            language = line[3:].strip()
            i += 1
            block = []
            while i < len(lines) and not lines[i].startswith("```"):
                block.append(lines[i])
                i += 1
            assert i < len(lines), "Unclosed Markdown code fence"
            lang = "GuideJS" if language in {"js", "jsx", "ts", "tsx"} else "{}"
            listing = "\n".join(block).replace(
                "📚", r'(*@{\bookfont\symbol{"1F4DA}}@*)')
            chunks.append(r"\Needspace{3\baselineskip}" + "\n" +
                          r"\begin{lstlisting}[language=" + lang + "]\n" +
                          listing + "\n" + r"\end{lstlisting}")
            i += 1
            continue
        heading = re.match(r"^(#{2,4}) (.+)$", line)
        if heading:
            command = {2: "section", 3: "subsection", 4: "subsubsection"}[len(heading[1])]
            chunks.append(r"\Needspace{10\baselineskip}" + "\n" +
                          "\\" + command + "{" + inline(heading[2], True) + "}")
            i += 1
            continue
        if line.startswith("|"):
            block = []
            while i < len(lines) and lines[i].startswith("|"):
                block.append(lines[i])
                i += 1
            chunks.append(table(block))
            continue
        if line.startswith("- ") or re.match(r"^\d+\. ", line):
            ordered = not line.startswith("- ")
            environment = "enumerate" if ordered else "itemize"
            block = ["\\begin{" + environment + "}"]
            pattern = r"^\d+\. (.+)$" if ordered else r"^- (.+)$"
            while i < len(lines) and (item := re.match(pattern, lines[i])):
                block.append(r"\item " + inline(item[1]))
                i += 1
            block.append("\\end{" + environment + "}")
            chunks.append("\n".join(block))
            continue
        paragraph = []
        while i < len(lines) and lines[i].strip():
            if paragraph and re.match(r"^(#{1,4} |```|\||- |\d+\. )", lines[i]):
                break
            paragraph.append(lines[i].strip())
            i += 1
        joined = " ".join(paragraph)
        if len(joined) < 160 and (joined.endswith(":") or joined.startswith(
            ("**Output", "**Real output", "**Example", "**Original", "**Without")
        )):
            chunks.append(r"\Needspace{5\baselineskip}")
        chunks.append(inline(joined))
    return "\n\n".join(chunks)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--tectonic", help="Path to the Tectonic executable")
    parser.add_argument("--generate-only", action="store_true")
    args = parser.parse_args()
    markdown = (ROOT / "README.md").read_text(encoding="utf-8-sig")
    digest = hashlib.sha256(markdown.encode("utf-8")).hexdigest()
    TEX.write_text(PREAMBLE + f"\n% README SHA256: {digest}\n" +
                   convert(markdown) + "\n\\end{document}\n", encoding="utf-8")
    print(f"Generated {TEX}", flush=True)
    if args.generate_only:
        return
    engine = args.tectonic or shutil.which("tectonic")
    if not engine:
        local = ROOT.parent / ".tools" / "tectonic.exe"
        if local.is_file():
            engine = str(local)
    if not engine:
        parser.error("Install Tectonic or supply --tectonic PATH; the .tex source is generated.")
    build = LATEX / ".build"
    build.mkdir(exist_ok=True)
    environment = os.environ.copy()
    environment.setdefault("TECTONIC_CACHE_DIR", str(build / "cache"))
    if os.name == "nt" and "FONTCONFIG_FILE" not in environment:
        fonts = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"
        font_config = build / "fontconfig.xml"
        font_config.write_text(
            '<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd">'
            '<fontconfig><dir>' + xml_escape(fonts.as_posix()) + '</dir>'
            '<cachedir>' + xml_escape((build / "font-cache").as_posix()) +
            '</cachedir></fontconfig>', encoding="utf-8")
        environment["FONTCONFIG_FILE"] = str(font_config)
    subprocess.run([engine, "--keep-logs", "--keep-intermediates", "--outdir",
                    str(build), str(TEX)], cwd=LATEX, env=environment, check=True)
    shutil.copy2(build / PDF.name, PDF)
    print(f"Compiled {PDF}", flush=True)


if __name__ == "__main__":
    main()
