#!/usr/bin/env python3
"""
Simple Console Python API Server

A lightweight Flask-based API server that takes data, processes it, and returns results.
"""

from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    """Home endpoint with API information."""
    return jsonify({
        'message': 'Welcome to the Simple Python API Server',
        'endpoints': {
            '/': 'GET - This help message',
            '/process': 'POST - Process data and return results',
            '/echo': 'POST - Echo back the received data',
            '/transform': 'POST - Transform data (uppercase, reverse, etc.)',
            '/health': 'GET - Health check endpoint'
        }
    })


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'healthy', 'service': 'python-api-server'})


@app.route('/echo', methods=['POST'])
def echo():
    """Echo back the received data."""
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'No JSON data provided'}), 400

    return jsonify({
        'received': data,
        'message': 'Data echoed successfully'
    })


@app.route('/process', methods=['POST'])
def process():
    """
    Process incoming data and return results.

    Expected JSON format:
    {
        "data": <any>,
        "operation": "count" | "sum" | "stats" | "info"
    }
    """
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'No JSON data provided'}), 400

    payload = data.get('data')
    operation = data.get('operation', 'info')

    result = {}

    if operation == 'count':
        # Count items if iterable
        if isinstance(payload, (list, dict, str)):
            result = {'count': len(payload)}
        else:
            result = {'count': 1}

    elif operation == 'sum':
        # Sum numbers in a list
        if isinstance(payload, list):
            try:
                result = {'sum': sum(payload)}
            except TypeError:
                result = {'error': 'Cannot sum non-numeric values'}
        elif isinstance(payload, (int, float)):
            result = {'sum': payload}
        else:
            result = {'error': 'Sum operation requires numeric data or list of numbers'}

    elif operation == 'stats':
        # Get basic statistics for a list of numbers
        if isinstance(payload, list) and all(isinstance(x, (int, float)) for x in payload):
            if len(payload) > 0:
                result = {
                    'count': len(payload),
                    'sum': sum(payload),
                    'min': min(payload),
                    'max': max(payload),
                    'average': sum(payload) / len(payload)
                }
            else:
                result = {'error': 'Empty list provided'}
        else:
            result = {'error': 'Stats operation requires a list of numbers'}

    elif operation == 'info':
        # Get info about the data
        result = {
            'type': type(payload).__name__,
            'value': payload
        }
        if isinstance(payload, (list, dict, str)):
            result['length'] = len(payload)

    else:
        result = {'error': f'Unknown operation: {operation}'}

    return jsonify({
        'operation': operation,
        'result': result
    })


@app.route('/transform', methods=['POST'])
def transform():
    """
    Transform string data.

    Expected JSON format:
    {
        "text": "string to transform",
        "transformation": "uppercase" | "lowercase" | "reverse" | "title"
    }
    """
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'No JSON data provided'}), 400

    text = data.get('text', '')
    transformation = data.get('transformation', 'uppercase')

    if not isinstance(text, str):
        return jsonify({'error': 'Text must be a string'}), 400

    if transformation == 'uppercase':
        result = text.upper()
    elif transformation == 'lowercase':
        result = text.lower()
    elif transformation == 'reverse':
        result = text[::-1]
    elif transformation == 'title':
        result = text.title()
    else:
        return jsonify({'error': f'Unknown transformation: {transformation}'}), 400

    return jsonify({
        'original': text,
        'transformation': transformation,
        'result': result
    })


def main():
    """Run the API server."""
    print("=" * 50)
    print("  Simple Python API Server")
    print("=" * 50)
    print("\nStarting server on http://127.0.0.1:5000")
    print("\nAvailable endpoints:")
    print("  GET  /          - API information")
    print("  GET  /health    - Health check")
    print("  POST /echo      - Echo data back")
    print("  POST /process   - Process data")
    print("  POST /transform - Transform text")
    print("\nPress Ctrl+C to stop the server")
    print("-" * 50)

    app.run(host='127.0.0.1', port=5000, debug=True)


if __name__ == '__main__':
    main()
