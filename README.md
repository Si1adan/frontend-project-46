### Hexlet tests and linter status:
[![Actions Status](https://github.com/Si1adan/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Si1adan/frontend-project-46/actions)

### Check dependencies, linter, tests status:
[![Actions Status](https://github.com/Si1adan/frontend-project-46/workflows/node-ci/badge.svg)](https://github.com/Si1adan/frontend-project-46/actions)

### Test Coverage status:
[![Test Coverage](https://api.codeclimate.com/v1/badges/e105023dd6bb33fe5930/test_coverage)](https://codeclimate.com/github/Si1adan/frontend-project-46/test_coverage)

### Maintainability status:
[![Maintainability](https://api.codeclimate.com/v1/badges/e105023dd6bb33fe5930/maintainability)](https://codeclimate.com/github/Si1adan/frontend-project-46/maintainability)

# Program "Difference generator" 

#### Compares two configuration files and shows a difference. Supported formats: json, yaml, yml

## Setup
```
git clone git@github.com:Si1adan/frontend-project-46.git
cd frontend-project-46
make install
```
## Usage
```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version       output the version number
  -f --format <type>  output format (default: "stylish")
  -h, --help          display help for command
```
## Run features
The path to the file can be absolute or relative.

***Options:***
* stylish (default)
* plain
* json

### Stylish output form (default)
[![asciicast](https://asciinema.org/a/ozK59vg0MS6KnbnGTIZqP2SuH.svg)](https://asciinema.org/a/ozK59vg0MS6KnbnGTIZqP2SuH)

### Plain output form 
[![asciicast](https://asciinema.org/a/yegw02V0lwuSADL4CpQKtlHRB.svg)](https://asciinema.org/a/yegw02V0lwuSADL4CpQKtlHRB)

### Json output form
[![asciicast](https://asciinema.org/a/GNd4vEc6GMcIEq0TGL1HxCYys.svg)](https://asciinema.org/a/GNd4vEc6GMcIEq0TGL1HxCYys)

