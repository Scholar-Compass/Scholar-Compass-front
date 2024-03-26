/**
 * 修改自 mkdocs-material。
 *
 * 目前采用的`typings/_/index.d.ts`版本如下，若上游有修改，我们应跟随。
 * https://github.com/squidfunk/mkdocs-material/blob/545803977829e05fdc4f0c3b6c0e0cd9a72fde84/typings/_/index.d.ts
 *
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

declare global {
  /**
   * Fetch the value for a key from the given storage
   *
   * This function is defined in `partials/javascripts/base.html`, so it can be
   * used from the templates, as well as from the application bundle.
   *
   * @template T - Data type
   *
   * @param key - Key
   * @param storage - Storage (default: local storage)
   * @param base - Base URL (default: current base)
   *
   * @return Value or nothing
   */
  function __md_get<T>(key: string, storage?: Storage, base?: URL): T | null;
}

export {};
