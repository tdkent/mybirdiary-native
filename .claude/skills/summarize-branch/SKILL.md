---

name: summarize-branch
description: Summarizes the commits on the current branch (compared to main) and flags anything risky. Use when the user asks what a branch changes, wants a PR description, or asks to review their branch or commit history.
---

## Current branch

!`git branch --show-current`

## Commits on this branch

!`git log --format='%h %s%n%b' main..HEAD`

## Combined diff against main

!`git diff main...HEAD`

## Instructions

Summarize the branch's changes above in two or three bullet points, then list any risks you notice such as missing error handling, hardcoded values, or tests that need updating. Base the summary on the combined diff, and use the commit messages for intent. If there are no commits on the branch compared to main, say so.
