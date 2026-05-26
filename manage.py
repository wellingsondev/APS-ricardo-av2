#!/usr/bin/env python
"""
Wrapper para executar manage.py do backend.
Execute comandos Django usando: python manage.py <comando>
"""
import os
import sys
import subprocess

if __name__ == '__main__':
    backend_manage = os.path.join(os.path.dirname(__file__), 'backend', 'manage.py')
    sys.exit(subprocess.call([sys.executable, backend_manage] + sys.argv[1:]))
