# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import datetime
import hashlib
import json
from flask import Flask, jsonify

# Parte 1: criar um blockchain


class Blockchain:
    def __init(self):
        self.chain = []
        self.create_block(proof = 1, previous_block='0')