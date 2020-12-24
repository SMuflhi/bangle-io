/* eslint-disable */
module.exports = {
  name: '@yarnpkg/plugin-constraints',
  factory: function (require) {
    var plugin;
    plugin = (() => {
      var e = {
          1023: (e, r, t) => {
            'use strict';
            t.r(r), t.d(r, { default: () => F });
            var n = t(966);
            /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function i(
              e,
              r,
              t,
              n,
            ) {
              var i,
                a = arguments.length,
                s =
                  a < 3
                    ? r
                    : null === n
                    ? (n = Object.getOwnPropertyDescriptor(r, t))
                    : n;
              if (
                'object' == typeof Reflect &&
                'function' == typeof Reflect.decorate
              )
                s = Reflect.decorate(e, r, t, n);
              else
                for (var o = e.length - 1; o >= 0; o--)
                  (i = e[o]) &&
                    (s = (a < 3 ? i(s) : a > 3 ? i(r, t, s) : i(r, t)) || s);
              return a > 3 && s && Object.defineProperty(r, t, s), s;
            }
            var a = t(2594),
              s = t(8042),
              o = t(4688),
              p = t(5047),
              l = t.n(p),
              u = t(3465),
              c = t.n(u),
              y = t(4674),
              _ = t.n(y),
              f = t(2184),
              d = t.n(f);
            const {
              is_atom: w,
              is_variable: h,
              is_instantiated_list: g,
            } = c().type;
            function m(e, r, t) {
              e.prepend(
                t.map(
                  (e) =>
                    new (c().type.State)(r.goal.replace(e), r.substitution, r),
                ),
              );
            }
            const v = new WeakMap();
            function b(e) {
              const r = v.get(e.session);
              if (null == r)
                throw new Error(
                  'Assertion failed: A project should have been registered for the active session',
                );
              return r;
            }
            const x = new (c().type.Module)(
              'constraints',
              {
                'project_workspaces_by_descriptor/3': (e, r, t) => {
                  const [i, a, s] = t.args;
                  if (!w(i) || !w(a))
                    return void e.throwError(
                      c().error.instantiation(t.indicator),
                    );
                  const o = n.structUtils.parseIdent(i.id),
                    p = n.structUtils.makeDescriptor(o, a.id),
                    l = b(e).tryWorkspaceByDescriptor(p);
                  h(s) &&
                    null !== l &&
                    m(e, r, [
                      new (c().type.Term)('=', [
                        s,
                        new (c().type.Term)(String(l.relativeCwd)),
                      ]),
                    ]),
                    w(s) &&
                      null !== l &&
                      l.relativeCwd === s.id &&
                      e.success(r);
                },
                'workspace_field/3': (e, r, t) => {
                  const [n, i, a] = t.args;
                  if (!w(n) || !w(i))
                    return void e.throwError(
                      c().error.instantiation(t.indicator),
                    );
                  const s = b(e).tryWorkspaceByCwd(n.id);
                  if (null == s) return;
                  const o = _()(s.manifest.raw, i.id);
                  void 0 !== o &&
                    m(e, r, [
                      new (c().type.Term)('=', [
                        a,
                        new (c().type.Term)(String(o)),
                      ]),
                    ]);
                },
                'workspace_field_test/3': (e, r, t) => {
                  const [n, i, a] = t.args;
                  e.prepend([
                    new (c().type.State)(
                      r.goal.replace(
                        new (c().type.Term)('workspace_field_test', [
                          n,
                          i,
                          a,
                          new (c().type.Term)('[]', []),
                        ]),
                      ),
                      r.substitution,
                      r,
                    ),
                  ]);
                },
                'workspace_field_test/4': (e, r, t) => {
                  const [n, i, a, s] = t.args;
                  if (!(w(n) && w(i) && w(a) && g(s)))
                    return void e.throwError(
                      c().error.instantiation(t.indicator),
                    );
                  const o = b(e).tryWorkspaceByCwd(n.id);
                  if (null == o) return;
                  const p = _()(o.manifest.raw, i.id);
                  if (void 0 === p) return;
                  const l = { $$: p };
                  for (const [e, r] of s.toJavaScript().entries())
                    l['$' + e] = r;
                  d().runInNewContext(a.id, l) && e.success(r);
                },
              },
              [
                'project_workspaces_by_descriptor/3',
                'workspace_field/3',
                'workspace_field_test/3',
                'workspace_field_test/4',
              ],
            );
            var T;
            l()(c()),
              (function (e) {
                (e.Dependencies = 'dependencies'),
                  (e.DevDependencies = 'devDependencies'),
                  (e.PeerDependencies = 'peerDependencies');
              })(T || (T = {}));
            const V = [T.Dependencies, T.DevDependencies, T.PeerDependencies];
            function k(e) {
              let r;
              try {
                r = (function e(r) {
                  if (r instanceof c().type.Num) return r.value;
                  if (r instanceof c().type.Term) {
                    if (0 === r.args.length) return r.id;
                    switch (r.indicator) {
                      case 'throw/1':
                      case 'error/1':
                        return e(r.args[0]);
                      case 'error/2':
                        return Object.assign(e(r.args[0]), ...e(r.args[1]));
                      case 'syntax_error/1':
                        return new n.ReportError(
                          n.MessageName.PROLOG_SYNTAX_ERROR,
                          'Syntax error: ' + e(r.args[0]),
                        );
                      case 'existence_error/2':
                        return new n.ReportError(
                          n.MessageName.PROLOG_EXISTENCE_ERROR,
                          `Existence error: ${e(r.args[0])} ${e(
                            r.args[1],
                          )} not found`,
                        );
                      case 'line/1':
                        return { line: e(r.args[0]) };
                      case 'column/1':
                        return { column: e(r.args[0]) };
                      case 'found/1':
                        return { found: e(r.args[0]) };
                      case './2':
                        return [e(r.args[0])].concat(e(r.args[1]));
                      case '//2':
                        return `${e(r.args[0])}/${e(r.args[1])}`;
                    }
                  }
                  throw (
                    "couldn't pretty print because of unsupported node " + r
                  );
                })(e);
              } catch (r) {
                throw 'string' == typeof r
                  ? new n.ReportError(
                      n.MessageName.PROLOG_UNKNOWN_ERROR,
                      `Unknown error: ${e} (note: ${r})`,
                    )
                  : r;
              }
              return (
                void 0 !== r.line &&
                  void 0 !== r.column &&
                  (r.message += ` at line ${r.line}, column ${r.column}`),
                r
              );
            }
            null == Symbol.asyncIterator &&
              (Symbol.asyncIterator = Symbol.for('Symbol.asyncIterator'));
            class S {
              constructor(e, r) {
                (this.session = c().create()),
                  (function (e, r) {
                    v.set(e, r), e.consult(`:- use_module(library(${x.id})).`);
                  })(this.session, e),
                  this.session.consult(':- use_module(library(lists)).'),
                  this.session.consult(r);
              }
              fetchNextAnswer() {
                return new Promise((e) => {
                  this.session.answer((r) => {
                    e(r);
                  });
                });
              }
              async *makeQuery(e) {
                const r = this.session.query(e);
                if (!0 !== r) throw k(r);
                for (;;) {
                  const e = await this.fetchNextAnswer();
                  if (!e) break;
                  if ('throw' === e.id) throw k(e);
                  yield e;
                }
              }
            }
            function O(e) {
              return 'null' === e.id ? null : '' + e.toJavaScript();
            }
            function E(e) {
              if ('null' === e.id) return null;
              {
                const r = e.toJavaScript();
                if ('string' != typeof r) return JSON.stringify(r);
                try {
                  return JSON.stringify(JSON.parse(r));
                } catch (e) {
                  return JSON.stringify(r);
                }
              }
            }
            class P {
              constructor(e) {
                (this.source = ''), (this.project = e);
                const r = e.configuration.get('constraintsPath');
                o.xfs.existsSync(r) &&
                  (this.source = o.xfs.readFileSync(r, 'utf8'));
              }
              static async find(e) {
                return new P(e);
              }
              getProjectDatabase() {
                let e = '';
                for (const r of V) e += `dependency_type(${r}).\n`;
                for (const r of this.project.workspacesByCwd.values()) {
                  const t = r.relativeCwd;
                  (e += `workspace(${C(t)}).\n`),
                    (e += `workspace_ident(${C(t)}, ${C(
                      n.structUtils.stringifyIdent(r.locator),
                    )}).\n`),
                    (e += `workspace_version(${C(t)}, ${C(
                      r.manifest.version,
                    )}).\n`);
                  for (const i of V)
                    for (const a of r.manifest[i].values())
                      e += `workspace_has_dependency(${C(t)}, ${C(
                        n.structUtils.stringifyIdent(a),
                      )}, ${C(a.range)}, ${i}).\n`;
                }
                return (
                  (e += 'workspace(_) :- false.\n'),
                  (e += 'workspace_ident(_, _) :- false.\n'),
                  (e += 'workspace_version(_, _) :- false.\n'),
                  (e += 'workspace_has_dependency(_, _, _, _) :- false.\n'),
                  e
                );
              }
              getDeclarations() {
                let e = '';
                return (
                  (e += 'gen_enforced_dependency(_, _, _, _) :- false.\n'),
                  (e += 'gen_enforced_field(_, _, _) :- false.\n'),
                  'gen_enforced_dependency(_, _, _, _) :- false.\ngen_enforced_field(_, _, _) :- false.\n'
                );
              }
              get fullSource() {
                return `${this.getProjectDatabase()}\n${
                  this.source
                }\n${this.getDeclarations()}`;
              }
              createSession() {
                return new S(this.project, this.fullSource);
              }
              async process() {
                const e = this.createSession();
                return {
                  enforcedDependencies: await this.genEnforcedDependencies(e),
                  enforcedFields: await this.genEnforcedFields(e),
                };
              }
              async genEnforcedDependencies(e) {
                const r = [];
                for await (const t of e.makeQuery(
                  'workspace(WorkspaceCwd), dependency_type(DependencyType), gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType).',
                )) {
                  const e = o.ppath.resolve(
                      this.project.cwd,
                      O(t.links.WorkspaceCwd),
                    ),
                    i = O(t.links.DependencyIdent),
                    a = O(t.links.DependencyRange),
                    s = O(t.links.DependencyType);
                  if (null === e || null === i) throw new Error('Invalid rule');
                  const p = this.project.getWorkspaceByCwd(e),
                    l = n.structUtils.parseIdent(i);
                  r.push({
                    workspace: p,
                    dependencyIdent: l,
                    dependencyRange: a,
                    dependencyType: s,
                  });
                }
                return n.miscUtils.sortMap(r, [
                  ({ dependencyRange: e }) => (null !== e ? '0' : '1'),
                  ({ workspace: e }) => n.structUtils.stringifyIdent(e.locator),
                  ({ dependencyIdent: e }) => n.structUtils.stringifyIdent(e),
                ]);
              }
              async genEnforcedFields(e) {
                const r = [];
                for await (const t of e.makeQuery(
                  'workspace(WorkspaceCwd), gen_enforced_field(WorkspaceCwd, FieldPath, FieldValue).',
                )) {
                  const e = o.ppath.resolve(
                      this.project.cwd,
                      O(t.links.WorkspaceCwd),
                    ),
                    n = O(t.links.FieldPath),
                    i = E(t.links.FieldValue);
                  if (null === e || null === n) throw new Error('Invalid rule');
                  const a = this.project.getWorkspaceByCwd(e);
                  r.push({ workspace: a, fieldPath: n, fieldValue: i });
                }
                return n.miscUtils.sortMap(r, [
                  ({ workspace: e }) => n.structUtils.stringifyIdent(e.locator),
                  ({ fieldPath: e }) => e,
                ]);
              }
              async *query(e) {
                const r = this.createSession();
                for await (const t of r.makeQuery(e)) {
                  const e = {};
                  for (const [r, n] of Object.entries(t.links))
                    '_' !== r && (e[r] = O(n));
                  yield e;
                }
              }
            }
            function C(e) {
              return 'string' == typeof e ? `'${e}'` : '[]';
            }
            class I extends a.BaseCommand {
              constructor() {
                super(...arguments), (this.json = !1);
              }
              async execute() {
                const e = await n.Configuration.find(
                    this.context.cwd,
                    this.context.plugins,
                  ),
                  { project: r } = await n.Project.find(e, this.context.cwd),
                  t = await P.find(r);
                let i = this.query;
                i.endsWith('.') || (i += '.');
                return (
                  await n.StreamReport.start(
                    {
                      configuration: e,
                      json: this.json,
                      stdout: this.context.stdout,
                    },
                    async (e) => {
                      for await (const r of t.query(i)) {
                        const t = Array.from(Object.entries(r)),
                          n = t.length,
                          i = t.reduce((e, [r]) => Math.max(e, r.length), 0);
                        for (let r = 0; r < n; r++) {
                          const [a, s] = t[r];
                          e.reportInfo(
                            null,
                            `${R(r, n)}${a.padEnd(i, ' ')} = ${N(s)}`,
                          );
                        }
                        e.reportJson(r);
                      }
                    },
                  )
                ).exitCode();
              }
            }
            function N(e) {
              return 'string' != typeof e
                ? '' + e
                : e.match(/^[a-zA-Z][a-zA-Z0-9_]+$/)
                ? e
                : `'${e}'`;
            }
            function R(e, r) {
              const t = 0 === e,
                n = e === r - 1;
              return t && n ? '' : t ? '┌ ' : n ? '└ ' : '│ ';
            }
            (I.usage = s.Command.Usage({
              category: 'Constraints-related commands',
              description: 'query the constraints fact database',
              details:
                '\n      This command will output all matches to the given prolog query.\n    ',
              examples: [
                [
                  'List all dependencies throughout the workspace',
                  "yarn constraints query 'workspace_has_dependency(_, DependencyName, _, _).'",
                ],
              ],
            })),
              i(
                [
                  s.Command.Boolean('--json', {
                    description: 'Format the output as an NDJSON stream',
                  }),
                ],
                I.prototype,
                'json',
                void 0,
              ),
              i([s.Command.String()], I.prototype, 'query', void 0),
              i(
                [s.Command.Path('constraints', 'query')],
                I.prototype,
                'execute',
                null,
              );
            class A extends a.BaseCommand {
              constructor() {
                super(...arguments), (this.verbose = !1);
              }
              async execute() {
                const e = await n.Configuration.find(
                    this.context.cwd,
                    this.context.plugins,
                  ),
                  { project: r } = await n.Project.find(e, this.context.cwd),
                  t = await P.find(r);
                this.context.stdout.write(
                  this.verbose ? t.fullSource : t.source,
                );
              }
            }
            (A.usage = s.Command.Usage({
              category: 'Constraints-related commands',
              description: 'print the source code for the constraints',
              details:
                '\n      This command will print the Prolog source code used by the constraints engine. Adding the `-v,--verbose` flag will print the *full* source code, including the fact database automatically compiled from the workspace manifests.\n    ',
              examples: [
                ['Prints the source code', 'yarn constraints source'],
                [
                  'Print the source code and the fact database',
                  'yarn constraints source -v',
                ],
              ],
            })),
              i(
                [
                  s.Command.Boolean('-v,--verbose', {
                    description:
                      'Also print the fact database automatically compiled from the workspace manifests',
                  }),
                ],
                A.prototype,
                'verbose',
                void 0,
              ),
              i(
                [s.Command.Path('constraints', 'source')],
                A.prototype,
                'execute',
                null,
              );
            var $ = t(1534),
              M = t.n($),
              j = t(404),
              X = t.n(j);
            class D extends a.BaseCommand {
              constructor() {
                super(...arguments), (this.fix = !1);
              }
              async execute() {
                const e = await n.Configuration.find(
                    this.context.cwd,
                    this.context.plugins,
                  ),
                  { project: r } = await n.Project.find(e, this.context.cwd),
                  t = await P.find(r),
                  i = await n.StreamReport.start(
                    { configuration: e, stdout: this.context.stdout },
                    async (r) => {
                      let n = new Set(),
                        i = [];
                      for (let r = 0, a = this.fix ? 10 : 1; r < a; ++r) {
                        i = [];
                        const r = new Set(),
                          a = await t.process();
                        if (
                          (await B(r, i, a.enforcedDependencies, {
                            fix: this.fix,
                            configuration: e,
                          }),
                          await q(r, i, a.enforcedFields, {
                            fix: this.fix,
                            configuration: e,
                          }),
                          (n = new Set([...n, ...r])),
                          0 === r.size)
                        )
                          break;
                      }
                      await Promise.all(
                        [...n].map(async (e) => {
                          e.manifest.load(e.manifest.raw),
                            await e.persistManifest();
                        }),
                      );
                      for (const [e, t] of i) r.reportError(e, t);
                    },
                  );
                return i.hasErrors() ? i.exitCode() : 0;
              }
            }
            async function B(e, r, t, { configuration: i, fix: a }) {
              const s = new Map(),
                o = new Map();
              for (const {
                workspace: e,
                dependencyIdent: r,
                dependencyRange: n,
                dependencyType: i,
              } of t) {
                let t = o.get(e);
                void 0 === t && o.set(e, (t = new Map()));
                let a = t.get(r.identHash);
                void 0 === a && t.set(r.identHash, (a = new Map()));
                let p = a.get(i);
                void 0 === p && a.set(i, (p = new Set())),
                  s.set(r.identHash, r),
                  p.add(n);
              }
              for (const [t, p] of o)
                for (const [o, l] of p) {
                  const p = s.get(o);
                  if (void 0 === p)
                    throw new Error(
                      'Assertion failed: The ident should have been registered',
                    );
                  for (const [s, o] of l) {
                    const l = [...o];
                    if (l.length > 2)
                      r.push([
                        n.MessageName.CONSTRAINTS_AMBIGUITY,
                        `${n.structUtils.prettyWorkspace(
                          i,
                          t,
                        )} must depend on ${n.structUtils.prettyIdent(
                          i,
                          p,
                        )} via conflicting ranges ${l
                          .slice(0, -1)
                          .map((e) => n.structUtils.prettyRange(i, String(e)))
                          .join(', ')}, and ${n.structUtils.prettyRange(
                          i,
                          String(l[l.length - 1]),
                        )} (in ${s})`,
                      ]);
                    else if (l.length > 1)
                      r.push([
                        n.MessageName.CONSTRAINTS_AMBIGUITY,
                        `${n.structUtils.prettyWorkspace(
                          i,
                          t,
                        )} must depend on ${n.structUtils.prettyIdent(
                          i,
                          p,
                        )} via conflicting ranges ${n.structUtils.prettyRange(
                          i,
                          String(l[0]),
                        )} and ${n.structUtils.prettyRange(
                          i,
                          String(l[1]),
                        )} (in ${s})`,
                      ]);
                    else {
                      const o = t.manifest[s].get(p.identHash),
                        [u] = l;
                      null !== u
                        ? o
                          ? o.range !== u &&
                            (a
                              ? (t.manifest[s].set(
                                  p.identHash,
                                  n.structUtils.makeDescriptor(p, u),
                                ),
                                e.add(t))
                              : r.push([
                                  n.MessageName
                                    .CONSTRAINTS_INCOMPATIBLE_DEPENDENCY,
                                  `${n.structUtils.prettyWorkspace(
                                    i,
                                    t,
                                  )} must depend on ${n.structUtils.prettyIdent(
                                    i,
                                    p,
                                  )} via ${n.structUtils.prettyRange(
                                    i,
                                    u,
                                  )}, but uses ${n.structUtils.prettyRange(
                                    i,
                                    o.range,
                                  )} instead (in ${s})`,
                                ]))
                          : a
                          ? (t.manifest[s].set(
                              p.identHash,
                              n.structUtils.makeDescriptor(p, u),
                            ),
                            e.add(t))
                          : r.push([
                              n.MessageName.CONSTRAINTS_MISSING_DEPENDENCY,
                              `${n.structUtils.prettyWorkspace(
                                i,
                                t,
                              )} must depend on ${n.structUtils.prettyIdent(
                                i,
                                p,
                              )} (via ${n.structUtils.prettyRange(
                                i,
                                u,
                              )}), but doesn't (in ${s})`,
                            ])
                        : o &&
                          (a
                            ? (t.manifest[s].delete(p.identHash), e.add(t))
                            : r.push([
                                n.MessageName.CONSTRAINTS_EXTRANEOUS_DEPENDENCY,
                                `${n.structUtils.prettyWorkspace(
                                  i,
                                  t,
                                )} has an extraneous dependency on ${n.structUtils.prettyIdent(
                                  i,
                                  p,
                                )} (in ${s})`,
                              ]));
                    }
                  }
                }
            }
            async function q(e, r, t, { configuration: i, fix: a }) {
              const s = new Map();
              for (const { workspace: e, fieldPath: r, fieldValue: i } of t) {
                const t = n.miscUtils.getMapWithDefault(s, e);
                n.miscUtils.getSetWithDefault(t, r).add(i);
              }
              for (const [t, o] of s)
                for (const [s, p] of o) {
                  const o = [...p];
                  if (o.length > 2)
                    r.push([
                      n.MessageName.CONSTRAINTS_AMBIGUITY,
                      `${n.structUtils.prettyWorkspace(
                        i,
                        t,
                      )} must have a field ${n.formatUtils.pretty(
                        i,
                        s,
                        'cyan',
                      )} set to conflicting values ${o
                        .slice(0, -1)
                        .map((e) =>
                          n.formatUtils.pretty(i, String(e), 'magenta'),
                        )
                        .join(', ')}, or ${n.formatUtils.pretty(
                        i,
                        String(o[o.length - 1]),
                        'magenta',
                      )}`,
                    ]);
                  else if (o.length > 1)
                    r.push([
                      n.MessageName.CONSTRAINTS_AMBIGUITY,
                      `${n.structUtils.prettyWorkspace(
                        i,
                        t,
                      )} must have a field ${n.formatUtils.pretty(
                        i,
                        s,
                        'cyan',
                      )} set to conflicting values ${n.formatUtils.pretty(
                        i,
                        String(o[0]),
                        'magenta',
                      )} or ${n.formatUtils.pretty(
                        i,
                        String(o[1]),
                        'magenta',
                      )}`,
                    ]);
                  else {
                    const p = _()(t.manifest.raw, s),
                      [l] = o;
                    null !== l
                      ? void 0 === p
                        ? a
                          ? (await U(t, s, l), e.add(t))
                          : r.push([
                              n.MessageName.CONSTRAINTS_MISSING_FIELD,
                              `${n.structUtils.prettyWorkspace(
                                i,
                                t,
                              )} must have a field ${n.formatUtils.pretty(
                                i,
                                s,
                                'cyan',
                              )} set to ${n.formatUtils.pretty(
                                i,
                                String(l),
                                'magenta',
                              )}, but doesn't`,
                            ])
                        : JSON.stringify(p) !== l &&
                          (a
                            ? (await U(t, s, l), e.add(t))
                            : r.push([
                                n.MessageName.CONSTRAINTS_INCOMPATIBLE_FIELD,
                                `${n.structUtils.prettyWorkspace(
                                  i,
                                  t,
                                )} must have a field ${n.formatUtils.pretty(
                                  i,
                                  s,
                                  'cyan',
                                )} set to ${n.formatUtils.pretty(
                                  i,
                                  String(l),
                                  'magenta',
                                )}, but is set to ${n.formatUtils.pretty(
                                  i,
                                  JSON.stringify(p),
                                  'magenta',
                                )} instead`,
                              ]))
                      : null != p &&
                        (a
                          ? (await U(t, s, null), e.add(t))
                          : r.push([
                              n.MessageName.CONSTRAINTS_EXTRANEOUS_FIELD,
                              `${n.structUtils.prettyWorkspace(
                                i,
                                t,
                              )} has an extraneous field ${n.formatUtils.pretty(
                                i,
                                s,
                                'cyan',
                              )} set to ${n.formatUtils.pretty(
                                i,
                                String(l),
                                'magenta',
                              )}`,
                            ]));
                  }
                }
            }
            async function U(e, r, t) {
              null === t
                ? X()(e.manifest.raw, r)
                : M()(e.manifest.raw, r, JSON.parse(t));
            }
            (D.usage = s.Command.Usage({
              category: 'Constraints-related commands',
              description: 'check that the project constraints are met',
              details:
                "\n      This command will run constraints on your project and emit errors for each one that is found but isn't met. If any error is emitted the process will exit with a non-zero exit code.\n\n      If the `--fix` flag is used, Yarn will attempt to automatically fix the issues the best it can, following a multi-pass process (with a maximum of 10 iterations). Some ambiguous patterns cannot be autofixed, in which case you'll have to manually specify the right resolution.\n\n      For more information as to how to write constraints, please consult our dedicated page on our website: https://yarnpkg.com/features/constraints.\n    ",
              examples: [
                [
                  'Check that all constraints are satisfied',
                  'yarn constraints',
                ],
                ['Autofix all unmet constraints', 'yarn constraints --fix'],
              ],
            })),
              i(
                [
                  s.Command.Boolean('--fix', {
                    description:
                      'Attempt to automatically fix unambiguous issues, following a multi-pass process',
                  }),
                ],
                D.prototype,
                'fix',
                void 0,
              ),
              i([s.Command.Path('constraints')], D.prototype, 'execute', null);
            const F = {
              configuration: {
                constraintsPath: {
                  description: 'The path of the constraints file.',
                  type: n.SettingsType.ABSOLUTE_PATH,
                  default: './constraints.pro',
                },
              },
              commands: [I, A, D],
            };
          },
          2574: (e, r, t) => {
            var n = t(1713),
              i = t(6688),
              a = t(5937),
              s = t(5017),
              o = t(9457);
            function p(e) {
              var r = -1,
                t = null == e ? 0 : e.length;
              for (this.clear(); ++r < t; ) {
                var n = e[r];
                this.set(n[0], n[1]);
              }
            }
            (p.prototype.clear = n),
              (p.prototype.delete = i),
              (p.prototype.get = a),
              (p.prototype.has = s),
              (p.prototype.set = o),
              (e.exports = p);
          },
          9197: (e, r, t) => {
            var n = t(4620),
              i = t(3682),
              a = t(3112),
              s = t(640),
              o = t(9380);
            function p(e) {
              var r = -1,
                t = null == e ? 0 : e.length;
              for (this.clear(); ++r < t; ) {
                var n = e[r];
                this.set(n[0], n[1]);
              }
            }
            (p.prototype.clear = n),
              (p.prototype.delete = i),
              (p.prototype.get = a),
              (p.prototype.has = s),
              (p.prototype.set = o),
              (e.exports = p);
          },
          3603: (e, r, t) => {
            var n = t(9513)(t(6169), 'Map');
            e.exports = n;
          },
          5009: (e, r, t) => {
            var n = t(8209),
              i = t(9706),
              a = t(3786),
              s = t(7926),
              o = t(7345);
            function p(e) {
              var r = -1,
                t = null == e ? 0 : e.length;
              for (this.clear(); ++r < t; ) {
                var n = e[r];
                this.set(n[0], n[1]);
              }
            }
            (p.prototype.clear = n),
              (p.prototype.delete = i),
              (p.prototype.get = a),
              (p.prototype.has = s),
              (p.prototype.set = o),
              (e.exports = p);
          },
          9976: (e, r, t) => {
            var n = t(6169).Symbol;
            e.exports = n;
          },
          783: (e) => {
            e.exports = function (e, r) {
              for (
                var t = -1, n = null == e ? 0 : e.length, i = Array(n);
                ++t < n;

              )
                i[t] = r(e[t], t, e);
              return i;
            };
          },
          5759: (e, r, t) => {
            var n = t(1198),
              i = t(1074),
              a = Object.prototype.hasOwnProperty;
            e.exports = function (e, r, t) {
              var s = e[r];
              (a.call(e, r) && i(s, t) && (void 0 !== t || r in e)) ||
                n(e, r, t);
            };
          },
          9836: (e, r, t) => {
            var n = t(1074);
            e.exports = function (e, r) {
              for (var t = e.length; t--; ) if (n(e[t][0], r)) return t;
              return -1;
            };
          },
          1198: (e, r, t) => {
            var n = t(65);
            e.exports = function (e, r, t) {
              '__proto__' == r && n
                ? n(e, r, {
                    configurable: !0,
                    enumerable: !0,
                    value: t,
                    writable: !0,
                  })
                : (e[r] = t);
            };
          },
          4173: (e, r, t) => {
            var n = t(6725),
              i = t(9874);
            e.exports = function (e, r) {
              for (var t = 0, a = (r = n(r, e)).length; null != e && t < a; )
                e = e[i(r[t++])];
              return t && t == a ? e : void 0;
            };
          },
          2502: (e, r, t) => {
            var n = t(9976),
              i = t(2854),
              a = t(7427),
              s = n ? n.toStringTag : void 0;
            e.exports = function (e) {
              return null == e
                ? void 0 === e
                  ? '[object Undefined]'
                  : '[object Null]'
                : s && s in Object(e)
                ? i(e)
                : a(e);
            };
          },
          1686: (e, r, t) => {
            var n = t(2533),
              i = t(5061),
              a = t(6778),
              s = t(6384),
              o = /^\[object .+?Constructor\]$/,
              p = Function.prototype,
              l = Object.prototype,
              u = p.toString,
              c = l.hasOwnProperty,
              y = RegExp(
                '^' +
                  u
                    .call(c)
                    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                    .replace(
                      /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                      '$1.*?',
                    ) +
                  '$',
              );
            e.exports = function (e) {
              return !(!a(e) || i(e)) && (n(e) ? y : o).test(s(e));
            };
          },
          624: (e, r, t) => {
            var n = t(5759),
              i = t(6725),
              a = t(8041),
              s = t(6778),
              o = t(9874);
            e.exports = function (e, r, t, p) {
              if (!s(e)) return e;
              for (
                var l = -1, u = (r = i(r, e)).length, c = u - 1, y = e;
                null != y && ++l < u;

              ) {
                var _ = o(r[l]),
                  f = t;
                if (l != c) {
                  var d = y[_];
                  void 0 === (f = p ? p(d, _, y) : void 0) &&
                    (f = s(d) ? d : a(r[l + 1]) ? [] : {});
                }
                n(y, _, f), (y = y[_]);
              }
              return e;
            };
          },
          7708: (e) => {
            e.exports = function (e, r, t) {
              var n = -1,
                i = e.length;
              r < 0 && (r = -r > i ? 0 : i + r),
                (t = t > i ? i : t) < 0 && (t += i),
                (i = r > t ? 0 : (t - r) >>> 0),
                (r >>>= 0);
              for (var a = Array(i); ++n < i; ) a[n] = e[n + r];
              return a;
            };
          },
          35: (e, r, t) => {
            var n = t(9976),
              i = t(783),
              a = t(2664),
              s = t(5558),
              o = n ? n.prototype : void 0,
              p = o ? o.toString : void 0;
            e.exports = function e(r) {
              if ('string' == typeof r) return r;
              if (a(r)) return i(r, e) + '';
              if (s(r)) return p ? p.call(r) : '';
              var t = r + '';
              return '0' == t && 1 / r == -1 / 0 ? '-0' : t;
            };
          },
          1622: (e, r, t) => {
            var n = t(6725),
              i = t(9845),
              a = t(7574),
              s = t(9874);
            e.exports = function (e, r) {
              return (r = n(r, e)), null == (e = a(e, r)) || delete e[s(i(r))];
            };
          },
          6725: (e, r, t) => {
            var n = t(2664),
              i = t(474),
              a = t(8689),
              s = t(3580);
            e.exports = function (e, r) {
              return n(e) ? e : i(e, r) ? [e] : a(s(e));
            };
          },
          4429: (e, r, t) => {
            var n = t(6169)['__core-js_shared__'];
            e.exports = n;
          },
          65: (e, r, t) => {
            var n = t(9513),
              i = (function () {
                try {
                  var e = n(Object, 'defineProperty');
                  return e({}, '', {}), e;
                } catch (e) {}
              })();
            e.exports = i;
          },
          8399: (e) => {
            var r =
              'object' == typeof global &&
              global &&
              global.Object === Object &&
              global;
            e.exports = r;
          },
          9253: (e, r, t) => {
            var n = t(9448);
            e.exports = function (e, r) {
              var t = e.__data__;
              return n(r) ? t['string' == typeof r ? 'string' : 'hash'] : t.map;
            };
          },
          9513: (e, r, t) => {
            var n = t(1686),
              i = t(8054);
            e.exports = function (e, r) {
              var t = i(e, r);
              return n(t) ? t : void 0;
            };
          },
          2854: (e, r, t) => {
            var n = t(9976),
              i = Object.prototype,
              a = i.hasOwnProperty,
              s = i.toString,
              o = n ? n.toStringTag : void 0;
            e.exports = function (e) {
              var r = a.call(e, o),
                t = e[o];
              try {
                e[o] = void 0;
                var n = !0;
              } catch (e) {}
              var i = s.call(e);
              return n && (r ? (e[o] = t) : delete e[o]), i;
            };
          },
          8054: (e) => {
            e.exports = function (e, r) {
              return null == e ? void 0 : e[r];
            };
          },
          1713: (e, r, t) => {
            var n = t(2437);
            e.exports = function () {
              (this.__data__ = n ? n(null) : {}), (this.size = 0);
            };
          },
          6688: (e) => {
            e.exports = function (e) {
              var r = this.has(e) && delete this.__data__[e];
              return (this.size -= r ? 1 : 0), r;
            };
          },
          5937: (e, r, t) => {
            var n = t(2437),
              i = Object.prototype.hasOwnProperty;
            e.exports = function (e) {
              var r = this.__data__;
              if (n) {
                var t = r[e];
                return '__lodash_hash_undefined__' === t ? void 0 : t;
              }
              return i.call(r, e) ? r[e] : void 0;
            };
          },
          5017: (e, r, t) => {
            var n = t(2437),
              i = Object.prototype.hasOwnProperty;
            e.exports = function (e) {
              var r = this.__data__;
              return n ? void 0 !== r[e] : i.call(r, e);
            };
          },
          9457: (e, r, t) => {
            var n = t(2437);
            e.exports = function (e, r) {
              var t = this.__data__;
              return (
                (this.size += this.has(e) ? 0 : 1),
                (t[e] = n && void 0 === r ? '__lodash_hash_undefined__' : r),
                this
              );
            };
          },
          8041: (e) => {
            var r = /^(?:0|[1-9]\d*)$/;
            e.exports = function (e, t) {
              var n = typeof e;
              return (
                !!(t = null == t ? 9007199254740991 : t) &&
                ('number' == n || ('symbol' != n && r.test(e))) &&
                e > -1 &&
                e % 1 == 0 &&
                e < t
              );
            };
          },
          474: (e, r, t) => {
            var n = t(2664),
              i = t(5558),
              a = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
              s = /^\w*$/;
            e.exports = function (e, r) {
              if (n(e)) return !1;
              var t = typeof e;
              return (
                !(
                  'number' != t &&
                  'symbol' != t &&
                  'boolean' != t &&
                  null != e &&
                  !i(e)
                ) ||
                s.test(e) ||
                !a.test(e) ||
                (null != r && e in Object(r))
              );
            };
          },
          9448: (e) => {
            e.exports = function (e) {
              var r = typeof e;
              return 'string' == r ||
                'number' == r ||
                'symbol' == r ||
                'boolean' == r
                ? '__proto__' !== e
                : null === e;
            };
          },
          5061: (e, r, t) => {
            var n,
              i = t(4429),
              a = (n = /[^.]+$/.exec((i && i.keys && i.keys.IE_PROTO) || ''))
                ? 'Symbol(src)_1.' + n
                : '';
            e.exports = function (e) {
              return !!a && a in e;
            };
          },
          4620: (e) => {
            e.exports = function () {
              (this.__data__ = []), (this.size = 0);
            };
          },
          3682: (e, r, t) => {
            var n = t(9836),
              i = Array.prototype.splice;
            e.exports = function (e) {
              var r = this.__data__,
                t = n(r, e);
              return (
                !(t < 0) &&
                (t == r.length - 1 ? r.pop() : i.call(r, t, 1), --this.size, !0)
              );
            };
          },
          3112: (e, r, t) => {
            var n = t(9836);
            e.exports = function (e) {
              var r = this.__data__,
                t = n(r, e);
              return t < 0 ? void 0 : r[t][1];
            };
          },
          640: (e, r, t) => {
            var n = t(9836);
            e.exports = function (e) {
              return n(this.__data__, e) > -1;
            };
          },
          9380: (e, r, t) => {
            var n = t(9836);
            e.exports = function (e, r) {
              var t = this.__data__,
                i = n(t, e);
              return (
                i < 0 ? (++this.size, t.push([e, r])) : (t[i][1] = r), this
              );
            };
          },
          8209: (e, r, t) => {
            var n = t(2574),
              i = t(9197),
              a = t(3603);
            e.exports = function () {
              (this.size = 0),
                (this.__data__ = {
                  hash: new n(),
                  map: new (a || i)(),
                  string: new n(),
                });
            };
          },
          9706: (e, r, t) => {
            var n = t(9253);
            e.exports = function (e) {
              var r = n(this, e).delete(e);
              return (this.size -= r ? 1 : 0), r;
            };
          },
          3786: (e, r, t) => {
            var n = t(9253);
            e.exports = function (e) {
              return n(this, e).get(e);
            };
          },
          7926: (e, r, t) => {
            var n = t(9253);
            e.exports = function (e) {
              return n(this, e).has(e);
            };
          },
          7345: (e, r, t) => {
            var n = t(9253);
            e.exports = function (e, r) {
              var t = n(this, e),
                i = t.size;
              return t.set(e, r), (this.size += t.size == i ? 0 : 1), this;
            };
          },
          1948: (e, r, t) => {
            var n = t(4499);
            e.exports = function (e) {
              var r = n(e, function (e) {
                  return 500 === t.size && t.clear(), e;
                }),
                t = r.cache;
              return r;
            };
          },
          2437: (e, r, t) => {
            var n = t(9513)(Object, 'create');
            e.exports = n;
          },
          7427: (e) => {
            var r = Object.prototype.toString;
            e.exports = function (e) {
              return r.call(e);
            };
          },
          7574: (e, r, t) => {
            var n = t(4173),
              i = t(7708);
            e.exports = function (e, r) {
              return r.length < 2 ? e : n(e, i(r, 0, -1));
            };
          },
          6169: (e, r, t) => {
            var n = t(8399),
              i =
                'object' == typeof self &&
                self &&
                self.Object === Object &&
                self,
              a = n || i || Function('return this')();
            e.exports = a;
          },
          8689: (e, r, t) => {
            var n = t(1948),
              i = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              a = /\\(\\)?/g,
              s = n(function (e) {
                var r = [];
                return (
                  46 === e.charCodeAt(0) && r.push(''),
                  e.replace(i, function (e, t, n, i) {
                    r.push(n ? i.replace(a, '$1') : t || e);
                  }),
                  r
                );
              });
            e.exports = s;
          },
          9874: (e, r, t) => {
            var n = t(5558);
            e.exports = function (e) {
              if ('string' == typeof e || n(e)) return e;
              var r = e + '';
              return '0' == r && 1 / e == -1 / 0 ? '-0' : r;
            };
          },
          6384: (e) => {
            var r = Function.prototype.toString;
            e.exports = function (e) {
              if (null != e) {
                try {
                  return r.call(e);
                } catch (e) {}
                try {
                  return e + '';
                } catch (e) {}
              }
              return '';
            };
          },
          1074: (e) => {
            e.exports = function (e, r) {
              return e === r || (e != e && r != r);
            };
          },
          4674: (e, r, t) => {
            var n = t(4173);
            e.exports = function (e, r, t) {
              var i = null == e ? void 0 : n(e, r);
              return void 0 === i ? t : i;
            };
          },
          2664: (e) => {
            var r = Array.isArray;
            e.exports = r;
          },
          2533: (e, r, t) => {
            var n = t(2502),
              i = t(6778);
            e.exports = function (e) {
              if (!i(e)) return !1;
              var r = n(e);
              return (
                '[object Function]' == r ||
                '[object GeneratorFunction]' == r ||
                '[object AsyncFunction]' == r ||
                '[object Proxy]' == r
              );
            };
          },
          6778: (e) => {
            e.exports = function (e) {
              var r = typeof e;
              return null != e && ('object' == r || 'function' == r);
            };
          },
          8496: (e) => {
            e.exports = function (e) {
              return null != e && 'object' == typeof e;
            };
          },
          5558: (e, r, t) => {
            var n = t(2502),
              i = t(8496);
            e.exports = function (e) {
              return (
                'symbol' == typeof e || (i(e) && '[object Symbol]' == n(e))
              );
            };
          },
          9845: (e) => {
            e.exports = function (e) {
              var r = null == e ? 0 : e.length;
              return r ? e[r - 1] : void 0;
            };
          },
          4499: (e, r, t) => {
            var n = t(5009);
            function i(e, r) {
              if (
                'function' != typeof e ||
                (null != r && 'function' != typeof r)
              )
                throw new TypeError('Expected a function');
              var t = function () {
                var n = arguments,
                  i = r ? r.apply(this, n) : n[0],
                  a = t.cache;
                if (a.has(i)) return a.get(i);
                var s = e.apply(this, n);
                return (t.cache = a.set(i, s) || a), s;
              };
              return (t.cache = new (i.Cache || n)()), t;
            }
            (i.Cache = n), (e.exports = i);
          },
          1534: (e, r, t) => {
            var n = t(624);
            e.exports = function (e, r, t) {
              return null == e ? e : n(e, r, t);
            };
          },
          3580: (e, r, t) => {
            var n = t(35);
            e.exports = function (e) {
              return null == e ? '' : n(e);
            };
          },
          404: (e, r, t) => {
            var n = t(1622);
            e.exports = function (e, r) {
              return null == e || n(e, r);
            };
          },
          6931: (e, r, t) => {
            'use strict';
            var n,
              i,
              a,
              s,
              o,
              p,
              l = 'win32' === process.platform,
              u =
                "The current environment doesn't support interactive reading from TTY.",
              c = t(5747),
              y = process.binding('tty_wrap').TTY,
              _ = t(3129),
              f = t(5622),
              d = {
                prompt: '> ',
                hideEchoBack: !1,
                mask: '*',
                limit: [],
                limitMessage: 'Input another, please.$<( [)limit(])>',
                defaultInput: '',
                trueValue: [],
                falseValue: [],
                caseSensitive: !1,
                keepWhitespace: !1,
                encoding: 'utf8',
                bufferSize: 1024,
                print: void 0,
                history: !0,
                cd: !1,
                phContent: void 0,
                preCheck: void 0,
              },
              w = 'none',
              h = !1,
              g = 0,
              m = '',
              v = [],
              b = !1,
              x = !1,
              T = !1;
            function V(e) {
              return s.concat(
                ((r = {
                  display: 'string',
                  displayOnly: 'boolean',
                  keyIn: 'boolean',
                  hideEchoBack: 'boolean',
                  mask: 'string',
                  limit: 'string',
                  caseSensitive: 'boolean',
                }),
                (t = []),
                Object.keys(r).forEach(function (n) {
                  'boolean' === r[n]
                    ? e[n] && t.push('--' + n)
                    : 'string' === r[n] &&
                      e[n] &&
                      t.push(
                        '--' + n,
                        e[n].replace(/[^\w\u0080-\uFFFF]/g, function (e) {
                          return '#' + e.charCodeAt(0) + ';';
                        }),
                      );
                }),
                t),
              );
              var r, t;
            }
            function k(e) {
              var r,
                n,
                i = {},
                p = { env: process.env, encoding: e.encoding };
              if (
                (a ||
                  (l
                    ? process.env.PSModulePath
                      ? ((a = 'powershell.exe'),
                        (s = [
                          '-ExecutionPolicy',
                          'Bypass',
                          '-File',
                          __dirname + '\\read.ps1',
                        ]))
                      : ((a = 'cscript.exe'),
                        (s = ['//nologo', __dirname + '\\read.cs.js']))
                    : ((a = '/bin/sh'), (s = [__dirname + '/read.sh']))),
                l && !process.env.PSModulePath && (p.stdio = [process.stdin]),
                _.execFileSync)
              ) {
                (r = V(e)), T && T('execFileSync', r);
                try {
                  i.input = _.execFileSync(a, r, p);
                } catch (e) {
                  (n = e.stderr ? (e.stderr + '').trim() : ''),
                    (i.error = new Error(u + (n ? '\n' + n : ''))),
                    (i.error.method = 'execFileSync'),
                    (i.error.program = a),
                    (i.error.args = r),
                    (i.error.extMessage = n),
                    (i.error.exitCode = e.status),
                    (i.error.code = e.code),
                    (i.error.signal = e.signal);
                }
              } else
                i = (function (e, r) {
                  function n(e) {
                    var r,
                      n,
                      i = '';
                    for (o = o || t(2087).tmpdir(); ; ) {
                      r = f.join(o, e + i);
                      try {
                        n = c.openSync(r, 'wx');
                      } catch (e) {
                        if ('EEXIST' === e.code) {
                          i++;
                          continue;
                        }
                        throw e;
                      }
                      c.closeSync(n);
                      break;
                    }
                    return r;
                  }
                  var i,
                    s,
                    p,
                    y,
                    d,
                    w,
                    h,
                    m,
                    v = {},
                    b = n('readline-sync.stdout'),
                    x = n('readline-sync.stderr'),
                    k = n('readline-sync.exit'),
                    S = n('readline-sync.done'),
                    O = t(6417);
                  (w = O.createHash('sha256')).update(
                    '' + process.pid + g++ + Math.random(),
                  ),
                    (m = w.digest('hex')),
                    (h = O.createDecipher('aes-256-cbc', m)),
                    (i = V(e)),
                    l
                      ? ((s = process.env.ComSpec || 'cmd.exe'),
                        (process.env.Q = '"'),
                        (p = [
                          '/V:ON',
                          '/S',
                          '/C',
                          '(%Q%' +
                            s +
                            '%Q% /V:ON /S /C %Q%%Q%' +
                            a +
                            '%Q%' +
                            i
                              .map(function (e) {
                                return ' %Q%' + e + '%Q%';
                              })
                              .join('') +
                            ' & (echo !ERRORLEVEL!)>%Q%' +
                            k +
                            '%Q%%Q%) 2>%Q%' +
                            x +
                            '%Q% |%Q%' +
                            process.execPath +
                            '%Q% %Q%' +
                            __dirname +
                            '\\encrypt.js%Q% %Q%aes-256-cbc%Q% %Q%' +
                            m +
                            '%Q% >%Q%' +
                            b +
                            '%Q% & (echo 1)>%Q%' +
                            S +
                            '%Q%',
                        ]))
                      : ((s = '/bin/sh'),
                        (p = [
                          '-c',
                          '("' +
                            a +
                            '"' +
                            i
                              .map(function (e) {
                                return " '" + e.replace(/'/g, "'\\''") + "'";
                              })
                              .join('') +
                            '; echo $?>"' +
                            k +
                            '") 2>"' +
                            x +
                            '" |"' +
                            process.execPath +
                            '" "' +
                            __dirname +
                            '/encrypt.js" "aes-256-cbc" "' +
                            m +
                            '" >"' +
                            b +
                            '"; echo 1 >"' +
                            S +
                            '"',
                        ])),
                    T && T('_execFileSync', i);
                  try {
                    _.spawn(s, p, r);
                  } catch (e) {
                    (v.error = new Error(e.message)),
                      (v.error.method = '_execFileSync - spawn'),
                      (v.error.program = s),
                      (v.error.args = p);
                  }
                  for (
                    ;
                    '1' !== c.readFileSync(S, { encoding: e.encoding }).trim();

                  );
                  return (
                    '0' ===
                    (y = c.readFileSync(k, { encoding: e.encoding }).trim())
                      ? (v.input =
                          h.update(
                            c.readFileSync(b, { encoding: 'binary' }),
                            'hex',
                            e.encoding,
                          ) + h.final(e.encoding))
                      : ((d = c
                          .readFileSync(x, { encoding: e.encoding })
                          .trim()),
                        (v.error = new Error(u + (d ? '\n' + d : ''))),
                        (v.error.method = '_execFileSync'),
                        (v.error.program = s),
                        (v.error.args = p),
                        (v.error.extMessage = d),
                        (v.error.exitCode = +y)),
                    c.unlinkSync(b),
                    c.unlinkSync(x),
                    c.unlinkSync(k),
                    c.unlinkSync(S),
                    v
                  );
                })(e, p);
              return (
                i.error ||
                  ((i.input = i.input.replace(/^\s*'|'\s*$/g, '')),
                  (e.display = '')),
                i
              );
            }
            function S(e) {
              var r = '',
                t = e.display,
                a = !e.display && e.keyIn && e.hideEchoBack && !e.mask;
              function s() {
                var r = k(e);
                if (r.error) throw r.error;
                return r.input;
              }
              return (
                x && x(e),
                (function () {
                  var e, r, t;
                  function a() {
                    return (
                      e ||
                        ((e = process.binding('fs')),
                        (r = process.binding('constants'))),
                      e
                    );
                  }
                  if ('string' == typeof w)
                    if (((w = null), l)) {
                      if (
                        ((t = (function (e) {
                          var r = process.version
                              .replace(/^\D+/, '')
                              .split('.'),
                            t = 0;
                          return (
                            (r[0] = +r[0]) && (t += 1e4 * r[0]),
                            (r[1] = +r[1]) && (t += 100 * r[1]),
                            (r[2] = +r[2]) && (t += r[2]),
                            t
                          );
                        })()) >= 20302 &&
                          t < 40204) ||
                        (t >= 5e4 && t < 50100) ||
                        (t >= 50600 && t < 60200) ||
                        !process.stdin.isTTY
                      )
                        try {
                          (w = a().open(
                            'CONIN$',
                            r.O_RDWR,
                            parseInt('0666', 8),
                          )),
                            (i = new y(w, !0));
                        } catch (e) {}
                      else
                        process.stdin.pause(),
                          (w = process.stdin.fd),
                          (i = process.stdin._handle);
                      if (process.stdout.isTTY) n = process.stdout.fd;
                      else {
                        try {
                          n = c.openSync('\\\\.\\CON', 'w');
                        } catch (e) {}
                        if ('number' != typeof n)
                          try {
                            n = a().open(
                              'CONOUT$',
                              r.O_RDWR,
                              parseInt('0666', 8),
                            );
                          } catch (e) {}
                      }
                    } else {
                      if (process.stdin.isTTY) {
                        process.stdin.pause();
                        try {
                          (w = c.openSync('/dev/tty', 'r')),
                            (i = process.stdin._handle);
                        } catch (e) {}
                      } else
                        try {
                          (w = c.openSync('/dev/tty', 'r')), (i = new y(w, !1));
                        } catch (e) {}
                      if (process.stdout.isTTY) n = process.stdout.fd;
                      else
                        try {
                          n = c.openSync('/dev/tty', 'w');
                        } catch (e) {}
                    }
                })(),
                (function () {
                  var t,
                    o,
                    l,
                    u,
                    y,
                    _,
                    f,
                    d = !e.hideEchoBack && !e.keyIn;
                  function g(e) {
                    return e === h || (0 === i.setRawMode(e) && ((h = e), !0));
                  }
                  if (
                    ((p = ''),
                    !b && i && ('number' == typeof n || (!e.display && d)))
                  ) {
                    if (
                      (e.display &&
                        (c.writeSync(n, e.display), (e.display = '')),
                      !e.displayOnly)
                    )
                      if (g(!d)) {
                        for (
                          u = e.keyIn ? 1 : e.bufferSize,
                            l =
                              Buffer.allocUnsafe && Buffer.alloc
                                ? Buffer.alloc(u)
                                : new Buffer(u),
                            e.keyIn &&
                              e.limit &&
                              (o = new RegExp(
                                '[^' + e.limit + ']',
                                'g' + (e.caseSensitive ? '' : 'i'),
                              ));
                          ;

                        ) {
                          y = 0;
                          try {
                            y = c.readSync(w, l, 0, u);
                          } catch (e) {
                            if ('EOF' !== e.code) return g(!1), void (r += s());
                          }
                          if (
                            (y > 0
                              ? ((_ = l.toString(e.encoding, 0, y)), (p += _))
                              : ((_ = '\n'), (p += String.fromCharCode(0))),
                            _ &&
                              'string' ==
                                typeof (f = (_.match(/^(.*?)[\r\n]/) ||
                                  [])[1]) &&
                              ((_ = f), (t = !0)),
                            _ &&
                              (_ = _.replace(
                                /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g,
                                '',
                              )),
                            _ && o && (_ = _.replace(o, '')),
                            _ &&
                              (d ||
                                (e.hideEchoBack
                                  ? e.mask &&
                                    c.writeSync(
                                      n,
                                      new Array(_.length + 1).join(e.mask),
                                    )
                                  : c.writeSync(n, _)),
                              (r += _)),
                            (!e.keyIn && t) || (e.keyIn && r.length >= u))
                          )
                            break;
                        }
                        d || a || c.writeSync(n, '\n'), g(!1);
                      } else r = s();
                  } else r = s();
                })(),
                e.print &&
                  !a &&
                  e.print(
                    t +
                      (e.displayOnly
                        ? ''
                        : (e.hideEchoBack
                            ? new Array(r.length + 1).join(e.mask)
                            : r) + '\n'),
                    e.encoding,
                  ),
                e.displayOnly
                  ? ''
                  : (m = e.keepWhitespace || e.keyIn ? r : r.trim())
              );
            }
            function O(e, r) {
              var t = [];
              return (
                (function e(n) {
                  null != n &&
                    (Array.isArray(n)
                      ? n.forEach(e)
                      : (r && !r(n)) || t.push(n));
                })(e),
                t
              );
            }
            function E(e) {
              return e.replace(/[\x00-\x7f]/g, function (e) {
                return '\\x' + ('00' + e.charCodeAt().toString(16)).substr(-2);
              });
            }
            function P() {
              var e,
                r,
                t = Array.prototype.slice.call(arguments);
              return (
                t.length &&
                  'boolean' == typeof t[0] &&
                  (r = t.shift()) &&
                  ((e = Object.keys(d)), t.unshift(d)),
                t.reduce(function (t, n) {
                  return (
                    null == n ||
                      (n.hasOwnProperty('noEchoBack') &&
                        !n.hasOwnProperty('hideEchoBack') &&
                        ((n.hideEchoBack = n.noEchoBack), delete n.noEchoBack),
                      n.hasOwnProperty('noTrim') &&
                        !n.hasOwnProperty('keepWhitespace') &&
                        ((n.keepWhitespace = n.noTrim), delete n.noTrim),
                      r || (e = Object.keys(n)),
                      e.forEach(function (e) {
                        var r;
                        if (n.hasOwnProperty(e))
                          switch (((r = n[e]), e)) {
                            case 'mask':
                            case 'limitMessage':
                            case 'defaultInput':
                            case 'encoding':
                              (r = null != r ? r + '' : '') &&
                                'limitMessage' !== e &&
                                (r = r.replace(/[\r\n]/g, '')),
                                (t[e] = r);
                              break;
                            case 'bufferSize':
                              isNaN((r = parseInt(r, 10))) ||
                                'number' != typeof r ||
                                (t[e] = r);
                              break;
                            case 'displayOnly':
                            case 'keyIn':
                            case 'hideEchoBack':
                            case 'caseSensitive':
                            case 'keepWhitespace':
                            case 'history':
                            case 'cd':
                              t[e] = !!r;
                              break;
                            case 'limit':
                            case 'trueValue':
                            case 'falseValue':
                              t[e] = O(r, function (e) {
                                var r = typeof e;
                                return (
                                  'string' === r ||
                                  'number' === r ||
                                  'function' === r ||
                                  e instanceof RegExp
                                );
                              }).map(function (e) {
                                return 'string' == typeof e
                                  ? e.replace(/[\r\n]/g, '')
                                  : e;
                              });
                              break;
                            case 'print':
                            case 'phContent':
                            case 'preCheck':
                              t[e] = 'function' == typeof r ? r : void 0;
                              break;
                            case 'prompt':
                            case 'display':
                              t[e] = null != r ? r : '';
                          }
                      })),
                    t
                  );
                }, {})
              );
            }
            function C(e, r, t) {
              return r.some(function (r) {
                var n = typeof r;
                return 'string' === n
                  ? t
                    ? e === r
                    : e.toLowerCase() === r.toLowerCase()
                  : 'number' === n
                  ? parseFloat(e) === r
                  : 'function' === n
                  ? r(e)
                  : r instanceof RegExp && r.test(e);
              });
            }
            function I(e, r) {
              var t = f
                .normalize(
                  l
                    ? (process.env.HOMEDRIVE || '') +
                        (process.env.HOMEPATH || '')
                    : process.env.HOME || '',
                )
                .replace(/[\/\\]+$/, '');
              return (
                (e = f.normalize(e)),
                r
                  ? e.replace(/^~(?=\/|\\|$)/, t)
                  : e.replace(
                      new RegExp('^' + E(t) + '(?=\\/|\\\\|$)', l ? 'i' : ''),
                      '~',
                    )
              );
            }
            function N(e, r) {
              var t =
                  '(?:\\(([\\s\\S]*?)\\))?(\\w+|.-.)(?:\\(([\\s\\S]*?)\\))?',
                n = new RegExp('(\\$)?(\\$<' + t + '>)', 'g'),
                i = new RegExp('(\\$)?(\\$\\{' + t + '\\})', 'g');
              function a(e, t, n, i, a, s) {
                var o;
                return t || 'string' != typeof (o = r(a))
                  ? n
                  : o
                  ? (i || '') + o + (s || '')
                  : '';
              }
              return e.replace(n, a).replace(i, a);
            }
            function R(e, r, t) {
              var n,
                i,
                a = [],
                s = -1,
                o = 0,
                p = '';
              function l(e, r) {
                return (
                  r.length > 3
                    ? (e.push(r[0] + '...' + r[r.length - 1]), (i = !0))
                    : r.length && (e = e.concat(r)),
                  e
                );
              }
              return (
                (n = e
                  .reduce(function (e, r) {
                    return e.concat((r + '').split(''));
                  }, [])
                  .reduce(function (e, n) {
                    var i, u;
                    return (
                      r || (n = n.toLowerCase()),
                      (i = /^\d$/.test(n)
                        ? 1
                        : /^[A-Z]$/.test(n)
                        ? 2
                        : /^[a-z]$/.test(n)
                        ? 3
                        : 0),
                      t && 0 === i
                        ? (p += n)
                        : ((u = n.charCodeAt(0)),
                          i && i === s && u === o + 1
                            ? a.push(n)
                            : ((e = l(e, a)), (a = [n]), (s = i)),
                          (o = u)),
                      e
                    );
                  }, [])),
                (n = l(n, a)),
                p && (n.push(p), (i = !0)),
                { values: n, suppressed: i }
              );
            }
            function A(e, r) {
              return e.join(e.length > 2 ? ', ' : r ? ' / ' : '/');
            }
            function $(e, r) {
              var t,
                n,
                i,
                a = {};
              if (
                (r.phContent && (t = r.phContent(e, r)), 'string' != typeof t)
              )
                switch (e) {
                  case 'hideEchoBack':
                  case 'mask':
                  case 'defaultInput':
                  case 'caseSensitive':
                  case 'keepWhitespace':
                  case 'encoding':
                  case 'bufferSize':
                  case 'history':
                  case 'cd':
                    t = r.hasOwnProperty(e)
                      ? 'boolean' == typeof r[e]
                        ? r[e]
                          ? 'on'
                          : 'off'
                        : r[e] + ''
                      : '';
                    break;
                  case 'limit':
                  case 'trueValue':
                  case 'falseValue':
                    (n = r[r.hasOwnProperty(e + 'Src') ? e + 'Src' : e]),
                      (t = A(
                        (n = r.keyIn
                          ? (a = R(n, r.caseSensitive)).values
                          : n.filter(function (e) {
                              var r = typeof e;
                              return 'string' === r || 'number' === r;
                            })),
                        a.suppressed,
                      ));
                    break;
                  case 'limitCount':
                  case 'limitCountNotZero':
                    t =
                      (t =
                        r[r.hasOwnProperty('limitSrc') ? 'limitSrc' : 'limit']
                          .length) || 'limitCountNotZero' !== e
                        ? t + ''
                        : '';
                    break;
                  case 'lastInput':
                    t = m;
                    break;
                  case 'cwd':
                  case 'CWD':
                  case 'cwdHome':
                    (t = process.cwd()),
                      'CWD' === e
                        ? (t = f.basename(t))
                        : 'cwdHome' === e && (t = I(t));
                    break;
                  case 'date':
                  case 'time':
                  case 'localeDate':
                  case 'localeTime':
                    t = new Date()[
                      'to' +
                        e.replace(/^./, function (e) {
                          return e.toUpperCase();
                        }) +
                        'String'
                    ]();
                    break;
                  default:
                    'string' ==
                      typeof (i = (e.match(/^history_m(\d+)$/) || [])[1]) &&
                      (t = v[v.length - i] || '');
                }
              return t;
            }
            function M(e) {
              var r,
                t,
                n,
                i,
                a = /^(.)-(.)$/.exec(e),
                s = '';
              if (!a) return null;
              for (
                i =
                  (r = a[1].charCodeAt(0)) < (t = a[2].charCodeAt(0)) ? 1 : -1,
                  n = r;
                n !== t + i;
                n += i
              )
                s += String.fromCharCode(n);
              return s;
            }
            function j(e) {
              var r,
                t,
                n = new RegExp(/(\s*)(?:("|')(.*?)(?:\2|$)|(\S+))/g),
                i = '',
                a = [];
              for (e = e.trim(); (r = n.exec(e)); )
                (t = r[3] || r[4] || ''),
                  r[1] && (a.push(i), (i = '')),
                  (i += t);
              return i && a.push(i), a;
            }
            function X(e, r) {
              return (
                !(!r.trueValue.length || !C(e, r.trueValue, r.caseSensitive)) ||
                ((!r.falseValue.length ||
                  !C(e, r.falseValue, r.caseSensitive)) &&
                  e)
              );
            }
            function D(e) {
              var r, t, n, i, a, s, o;
              function p(r) {
                return $(r, e);
              }
              function l(r) {
                e.display += (/[^\r\n]$/.test(e.display) ? '\n' : '') + r;
              }
              for (
                e.limitSrc = e.limit,
                  e.displaySrc = e.display,
                  e.limit = '',
                  e.display = N(e.display + '', p);
                ;

              ) {
                if (
                  ((r = S(e)),
                  (t = !1),
                  (n = ''),
                  e.defaultInput && !r && (r = e.defaultInput),
                  e.history &&
                    ((i = /^\s*\!(?:\!|-1)(:p)?\s*$/.exec(r))
                      ? ((a = v[0] || ''),
                        i[1] ? (t = !0) : (r = a),
                        l(a + '\n'),
                        t || ((e.displayOnly = !0), S(e), (e.displayOnly = !1)))
                      : r && r !== v[v.length - 1] && (v = [r])),
                  !t && e.cd && r)
                )
                  switch ((s = j(r))[0].toLowerCase()) {
                    case 'cd':
                      if (s[1])
                        try {
                          process.chdir(I(s[1], !0));
                        } catch (e) {
                          l(e + '');
                        }
                      t = !0;
                      break;
                    case 'pwd':
                      l(process.cwd()), (t = !0);
                  }
                if (
                  (!t &&
                    e.preCheck &&
                    ((r = (o = e.preCheck(r, e)).res), o.forceNext && (t = !0)),
                  !t)
                ) {
                  if (!e.limitSrc.length || C(r, e.limitSrc, e.caseSensitive))
                    break;
                  e.limitMessage && (n = N(e.limitMessage, p));
                }
                l((n ? n + '\n' : '') + N(e.displaySrc + '', p));
              }
              return X(r, e);
            }
            function B(e, t, n) {
              var i;
              return (
                r.question(
                  e,
                  P({ limitMessage: 'Input valid number, please.' }, t, {
                    limit: function (e) {
                      return (i = n(e)), !isNaN(i) && 'number' == typeof i;
                    },
                    cd: !1,
                  }),
                ),
                i
              );
            }
            function q(e, r) {
              var t = {},
                n = {};
              return (
                'object' == typeof e
                  ? (Object.keys(e).forEach(function (t) {
                      'function' == typeof e[t] &&
                        (n[r.caseSensitive ? t : t.toLowerCase()] = e[t]);
                    }),
                    (t.preCheck = function (e) {
                      var i;
                      return (
                        (t.args = j(e)),
                        (i = t.args[0] || ''),
                        r.caseSensitive || (i = i.toLowerCase()),
                        (t.hRes =
                          '_' !== i && n.hasOwnProperty(i)
                            ? n[i].apply(e, t.args.slice(1))
                            : n.hasOwnProperty('_')
                            ? n._.apply(e, t.args)
                            : null),
                        { res: e, forceNext: !1 }
                      );
                    }),
                    n.hasOwnProperty('_') ||
                      (t.limit = function () {
                        var e = t.args[0] || '';
                        return (
                          r.caseSensitive || (e = e.toLowerCase()),
                          n.hasOwnProperty(e)
                        );
                      }))
                  : (t.preCheck = function (r) {
                      return (
                        (t.args = j(r)),
                        (t.hRes = 'function' != typeof e || e.apply(r, t.args)),
                        { res: r, forceNext: !1 }
                      );
                    }),
                t
              );
            }
            function U(e, t, n) {
              var i;
              return (
                null == e && (e = 'Are you sure? '),
                (t && !1 === t.guide) ||
                  !(e += '') ||
                  (e = e.replace(/\s*:?\s*$/, '') + ' [y/n]: '),
                'boolean' ==
                typeof (i = r.keyIn(
                  e,
                  P(t, {
                    hideEchoBack: !1,
                    limit: n,
                    trueValue: 'y',
                    falseValue: 'n',
                    caseSensitive: !1,
                  }),
                ))
                  ? i
                  : ''
              );
            }
            function F(e, t) {
              var n;
              return (
                t.length && ((n = {})[e] = t[0]), r.setDefaultOptions(n)[e]
              );
            }
            (r._DBG_set_useExt = function (e) {
              b = e;
            }),
              (r._DBG_set_checkOptions = function (e) {
                x = e;
              }),
              (r._DBG_set_checkMethod = function (e) {
                T = e;
              }),
              (r._DBG_clearHistory = function () {
                (m = ''), (v = []);
              }),
              (r.setDefaultOptions = function (e) {
                return (d = P(!0, e)), P(!0);
              }),
              (r.question = function (e, r) {
                return D(P(P(!0, r), { display: e }));
              }),
              (r.prompt = function (e) {
                var r = P(!0, e);
                return (r.display = r.prompt), D(r);
              }),
              (r.keyIn = function (e, r) {
                var t = P(P(!0, r), {
                  display: e,
                  keyIn: !0,
                  keepWhitespace: !0,
                });
                return (
                  (t.limitSrc = t.limit
                    .filter(function (e) {
                      var r = typeof e;
                      return 'string' === r || 'number' === r;
                    })
                    .map(function (e) {
                      return N(e + '', M);
                    })),
                  (t.limit = E(t.limitSrc.join(''))),
                  ['trueValue', 'falseValue'].forEach(function (e) {
                    t[e] = t[e].reduce(function (e, r) {
                      var t = typeof r;
                      return (
                        'string' === t || 'number' === t
                          ? (e = e.concat((r + '').split('')))
                          : e.push(r),
                        e
                      );
                    }, []);
                  }),
                  (t.display = N(t.display + '', function (e) {
                    return $(e, t);
                  })),
                  X(S(t), t)
                );
              }),
              (r.questionEMail = function (e, t) {
                return (
                  null == e && (e = 'Input e-mail address: '),
                  r.question(
                    e,
                    P(
                      {
                        hideEchoBack: !1,
                        limit: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                        limitMessage: 'Input valid e-mail address, please.',
                        trueValue: null,
                        falseValue: null,
                      },
                      t,
                      { keepWhitespace: !1, cd: !1 },
                    ),
                  )
                );
              }),
              (r.questionNewPassword = function (e, t) {
                var n,
                  i,
                  a,
                  s,
                  o,
                  p,
                  l,
                  u,
                  c,
                  y,
                  _ = P(
                    {
                      hideEchoBack: !0,
                      mask: '*',
                      limitMessage:
                        'It can include: $<charlist>\nAnd the length must be: $<length>',
                      trueValue: null,
                      falseValue: null,
                      caseSensitive: !0,
                    },
                    t,
                    {
                      history: !1,
                      cd: !1,
                      phContent: function (e) {
                        return 'charlist' === e
                          ? n.text
                          : 'length' === e
                          ? i + '...' + a
                          : null;
                      },
                    },
                  );
                for (
                  s = N((t = t || {}).charlist ? t.charlist + '' : '$<!-~>', M),
                    (isNaN((i = parseInt(t.min, 10))) ||
                      'number' != typeof i) &&
                      (i = 12),
                    (isNaN((a = parseInt(t.max, 10))) ||
                      'number' != typeof a) &&
                      (a = 24),
                    l = new RegExp('^[' + E(s) + ']{' + i + ',' + a + '}$'),
                    (n = R([s], _.caseSensitive, !0)).text = A(
                      n.values,
                      n.suppressed,
                    ),
                    o =
                      null != t.confirmMessage
                        ? t.confirmMessage
                        : 'Reinput a same one to confirm it: ',
                    p =
                      null != t.unmatchMessage
                        ? t.unmatchMessage
                        : 'It differs from first one. Hit only the Enter key if you want to retry from first one.',
                    null == e && (e = 'Input new password: '),
                    u = _.limitMessage;
                  !y;

                )
                  (_.limit = l),
                    (_.limitMessage = u),
                    (c = r.question(e, _)),
                    (_.limit = [c, '']),
                    (_.limitMessage = p),
                    (y = r.question(o, _));
                return c;
              }),
              (r.questionInt = function (e, r) {
                return B(e, r, function (e) {
                  return parseInt(e, 10);
                });
              }),
              (r.questionFloat = function (e, r) {
                return B(e, r, parseFloat);
              }),
              (r.questionPath = function (e, t) {
                var n,
                  i = '',
                  a = P(
                    {
                      hideEchoBack: !1,
                      limitMessage:
                        '$<error(\n)>Input valid path, please.$<( Min:)min>$<( Max:)max>',
                      history: !0,
                      cd: !0,
                    },
                    t,
                    {
                      keepWhitespace: !1,
                      limit: function (e) {
                        var r, a, s;
                        function o(e) {
                          e.split(/\/|\\/).reduce(function (e, r) {
                            var t = f.resolve((e += r + f.sep));
                            if (c.existsSync(t)) {
                              if (!c.statSync(t).isDirectory())
                                throw new Error(
                                  'Non directory already exists: ' + t,
                                );
                            } else c.mkdirSync(t);
                            return e;
                          }, '');
                        }
                        (e = I(e, !0)), (i = '');
                        try {
                          if (
                            ((r = c.existsSync(e)),
                            (n = r ? c.realpathSync(e) : f.resolve(e)),
                            (!t.hasOwnProperty('exists') && !r) ||
                              ('boolean' == typeof t.exists && t.exists !== r))
                          )
                            return (
                              (i =
                                (r
                                  ? 'Already exists'
                                  : 'No such file or directory') +
                                ': ' +
                                n),
                              !1
                            );
                          if (
                            (!r &&
                              t.create &&
                              (t.isDirectory
                                ? o(n)
                                : (o(f.dirname(n)),
                                  c.closeSync(c.openSync(n, 'w'))),
                              (n = c.realpathSync(n))),
                            r && (t.min || t.max || t.isFile || t.isDirectory))
                          ) {
                            if (((a = c.statSync(n)), t.isFile && !a.isFile()))
                              return (i = 'Not file: ' + n), !1;
                            if (t.isDirectory && !a.isDirectory())
                              return (i = 'Not directory: ' + n), !1;
                            if (
                              (t.min && a.size < +t.min) ||
                              (t.max && a.size > +t.max)
                            )
                              return (
                                (i =
                                  'Size ' + a.size + ' is out of range: ' + n),
                                !1
                              );
                          }
                          if (
                            'function' == typeof t.validate &&
                            !0 !== (s = t.validate(n))
                          )
                            return 'string' == typeof s && (i = s), !1;
                        } catch (e) {
                          return (i = e + ''), !1;
                        }
                        return !0;
                      },
                      phContent: function (e) {
                        return 'error' === e
                          ? i
                          : 'min' !== e && 'max' !== e
                          ? null
                          : t.hasOwnProperty(e)
                          ? t[e] + ''
                          : '';
                      },
                    },
                  );
                return (
                  (t = t || {}),
                  null == e && (e = 'Input path (you can "cd" and "pwd"): '),
                  r.question(e, a),
                  n
                );
              }),
              (r.promptCL = function (e, t) {
                var n = P(
                    {
                      hideEchoBack: !1,
                      limitMessage: 'Requested command is not available.',
                      caseSensitive: !1,
                      history: !0,
                    },
                    t,
                  ),
                  i = q(e, n);
                return (
                  (n.limit = i.limit),
                  (n.preCheck = i.preCheck),
                  r.prompt(n),
                  i.args
                );
              }),
              (r.promptLoop = function (e, t) {
                for (
                  var n = P(
                    {
                      hideEchoBack: !1,
                      trueValue: null,
                      falseValue: null,
                      caseSensitive: !1,
                      history: !0,
                    },
                    t,
                  );
                  !e(r.prompt(n));

                );
              }),
              (r.promptCLLoop = function (e, t) {
                var n = P(
                    {
                      hideEchoBack: !1,
                      limitMessage: 'Requested command is not available.',
                      caseSensitive: !1,
                      history: !0,
                    },
                    t,
                  ),
                  i = q(e, n);
                for (
                  n.limit = i.limit, n.preCheck = i.preCheck;
                  r.prompt(n), !i.hRes;

                );
              }),
              (r.promptSimShell = function (e) {
                return r.prompt(
                  P({ hideEchoBack: !1, history: !0 }, e, {
                    prompt: l
                      ? '$<cwd>>'
                      : (process.env.USER || '') +
                        (process.env.HOSTNAME
                          ? '@' + process.env.HOSTNAME.replace(/\..*$/, '')
                          : '') +
                        ':$<cwdHome>$ ',
                  }),
                );
              }),
              (r.keyInYN = function (e, r) {
                return U(e, r);
              }),
              (r.keyInYNStrict = function (e, r) {
                return U(e, r, 'yn');
              }),
              (r.keyInPause = function (e, t) {
                null == e && (e = 'Continue...'),
                  (t && !1 === t.guide) ||
                    !(e += '') ||
                    (e = e.replace(/\s+$/, '') + ' (Hit any key)'),
                  r.keyIn(
                    e,
                    P({ limit: null }, t, { hideEchoBack: !0, mask: '' }),
                  );
              }),
              (r.keyInSelect = function (e, t, n) {
                var i = P({ hideEchoBack: !1 }, n, {
                    trueValue: null,
                    falseValue: null,
                    caseSensitive: !1,
                    phContent: function (r) {
                      return 'itemsCount' === r
                        ? e.length + ''
                        : 'firstItem' === r
                        ? (e[0] + '').trim()
                        : 'lastItem' === r
                        ? (e[e.length - 1] + '').trim()
                        : null;
                    },
                  }),
                  a = '',
                  s = {},
                  o = 49,
                  p = '\n';
                if (!Array.isArray(e) || !e.length || e.length > 35)
                  throw '`items` must be Array (max length: 35).';
                return (
                  e.forEach(function (e, r) {
                    var t = String.fromCharCode(o);
                    (a += t),
                      (s[t] = r),
                      (p += '[' + t + '] ' + (e + '').trim() + '\n'),
                      (o = 57 === o ? 97 : o + 1);
                  }),
                  (n && !1 === n.cancel) ||
                    ((a += '0'),
                    (s[0] = -1),
                    (p +=
                      '[0] ' +
                      (n && null != n.cancel && 'boolean' != typeof n.cancel
                        ? (n.cancel + '').trim()
                        : 'CANCEL') +
                      '\n')),
                  (i.limit = a),
                  (p += '\n'),
                  null == t && (t = 'Choose one from list: '),
                  (t += '') &&
                    ((n && !1 === n.guide) ||
                      (t = t.replace(/\s*:?\s*$/, '') + ' [$<limit>]: '),
                    (p += t)),
                  s[r.keyIn(p, i).toLowerCase()]
                );
              }),
              (r.getRawInput = function () {
                return p;
              }),
              (r.setPrint = function () {
                return F('print', arguments);
              }),
              (r.setPrompt = function () {
                return F('prompt', arguments);
              }),
              (r.setEncoding = function () {
                return F('encoding', arguments);
              }),
              (r.setMask = function () {
                return F('mask', arguments);
              }),
              (r.setBufferSize = function () {
                return F('bufferSize', arguments);
              });
          },
          3465: (e, r, t) => {
            !(function () {
              var r,
                n = { major: 0, minor: 2, patch: 66, status: 'beta' };
              (tau_file_system = {
                files: {},
                open: function (e, r, t) {
                  var n = tau_file_system.files[e];
                  if (!n) {
                    if ('read' === t) return null;
                    (n = {
                      path: e,
                      text: '',
                      type: r,
                      get: function (e, r) {
                        return r === this.text.length || r > this.text.length
                          ? 'end_of_file'
                          : this.text.substring(r, r + e);
                      },
                      put: function (e, r) {
                        return 'end_of_file' === r
                          ? ((this.text += e), !0)
                          : 'past_end_of_file' === r
                          ? null
                          : ((this.text =
                              this.text.substring(0, r) +
                              e +
                              this.text.substring(r + e.length)),
                            !0);
                      },
                      get_byte: function (e) {
                        if ('end_of_stream' === e) return -1;
                        var r = Math.floor(e / 2);
                        if (this.text.length <= r) return -1;
                        var t = s(this.text[Math.floor(e / 2)], 0);
                        return e % 2 == 0 ? 255 & t : (t / 256) >>> 0;
                      },
                      put_byte: function (e, r) {
                        var t =
                          'end_of_stream' === r
                            ? this.text.length
                            : Math.floor(r / 2);
                        if (this.text.length < t) return null;
                        var n =
                          this.text.length === t
                            ? -1
                            : s(this.text[Math.floor(r / 2)], 0);
                        return (
                          (n =
                            r % 2 == 0
                              ? ((255 & (n = (n / 256) >>> 0)) << 8) | (255 & e)
                              : ((255 & e) << 8) | (255 & (n &= 255))),
                          this.text.length === t
                            ? (this.text += o(n))
                            : (this.text =
                                this.text.substring(0, t) +
                                o(n) +
                                this.text.substring(t + 1)),
                          !0
                        );
                      },
                      flush: function () {
                        return !0;
                      },
                      close: function () {
                        return !!tau_file_system.files[this.path] || null;
                      },
                    }),
                      (tau_file_system.files[e] = n);
                  }
                  return 'write' === t && (n.text = ''), n;
                },
              }),
                (tau_user_input = {
                  buffer: '',
                  get: function (e, r) {
                    for (var t; tau_user_input.buffer.length < e; )
                      (t = window.prompt()) && (tau_user_input.buffer += t);
                    return (
                      (t = tau_user_input.buffer.substr(0, e)),
                      (tau_user_input.buffer = tau_user_input.buffer.substr(e)),
                      t
                    );
                  },
                }),
                (tau_user_output = {
                  put: function (e, r) {
                    return console.log(e), !0;
                  },
                  flush: function () {
                    return !0;
                  },
                }),
                (nodejs_file_system = {
                  open: function (e, r, n) {
                    var i = t(5747),
                      a = i.openSync(e, n[0]);
                    return 'read' !== n || i.existsSync(e)
                      ? {
                          get: function (e, r) {
                            var t = new Buffer(e);
                            return i.readSync(a, t, 0, e, r), t.toString();
                          },
                          put: function (e, r) {
                            var t = Buffer.from(e);
                            if ('end_of_file' === r) i.writeSync(a, t);
                            else {
                              if ('past_end_of_file' === r) return null;
                              i.writeSync(a, t, 0, t.length, r);
                            }
                            return !0;
                          },
                          get_byte: function (e) {
                            return null;
                          },
                          put_byte: function (e, r) {
                            return null;
                          },
                          flush: function () {
                            return !0;
                          },
                          close: function () {
                            return i.closeSync(a), !0;
                          },
                        }
                      : null;
                  },
                }),
                (nodejs_user_input = {
                  buffer: '',
                  get: function (e, r) {
                    for (
                      var n, i = t(6931);
                      nodejs_user_input.buffer.length < e;

                    )
                      nodejs_user_input.buffer += i.question();
                    return (
                      (n = nodejs_user_input.buffer.substr(0, e)),
                      (nodejs_user_input.buffer = nodejs_user_input.buffer.substr(
                        e,
                      )),
                      n
                    );
                  },
                }),
                (nodejs_user_output = {
                  put: function (e, r) {
                    return process.stdout.write(e), !0;
                  },
                  flush: function () {
                    return !0;
                  },
                }),
                (r = Array.prototype.indexOf
                  ? function (e, r) {
                      return e.indexOf(r);
                    }
                  : function (e, r) {
                      for (var t = e.length, n = 0; n < t; n++)
                        if (r === e[n]) return n;
                      return -1;
                    });
              var i,
                a,
                s,
                o,
                p = function (e, r) {
                  if (0 !== e.length) {
                    for (var t = e[0], n = e.length, i = 1; i < n; i++)
                      t = r(t, e[i]);
                    return t;
                  }
                };
              (i = Array.prototype.map
                ? function (e, r) {
                    return e.map(r);
                  }
                : function (e, r) {
                    for (var t = [], n = e.length, i = 0; i < n; i++)
                      t.push(r(e[i]));
                    return t;
                  }),
                (a = Array.prototype.filter
                  ? function (e, r) {
                      return e.filter(r);
                    }
                  : function (e, r) {
                      for (var t = [], n = e.length, i = 0; i < n; i++)
                        r(e[i]) && t.push(e[i]);
                      return t;
                    }),
                (s = String.prototype.codePointAt
                  ? function (e, r) {
                      return e.codePointAt(r);
                    }
                  : function (e, r) {
                      return e.charCodeAt(r);
                    }),
                (o = String.fromCodePoint
                  ? function () {
                      return String.fromCodePoint.apply(null, arguments);
                    }
                  : function () {
                      return String.fromCharCode.apply(null, arguments);
                    });
              var l = /(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)|\\x([0-9a-fA-F]+)\\|\\([0-7]+)\\|(\\\\)|(\\')|('')|(\\")|(\\`)|(\\.)|(.)/g,
                u = {
                  '\\a': 7,
                  '\\b': 8,
                  '\\f': 12,
                  '\\n': 10,
                  '\\r': 13,
                  '\\t': 9,
                  '\\v': 11,
                };
              function c(e, r) {
                var t = '';
                if (e.length < 2) return e;
                try {
                  e = (e = e.replace(/\\([0-7]+)\\/g, function (e, r) {
                    return o(parseInt(r, 8));
                  })).replace(/\\x([0-9a-fA-F]+)\\/g, function (e, r) {
                    return o(parseInt(r, 16));
                  });
                } catch (e) {
                  return null;
                }
                for (var n = 0; n < e.length; n++) {
                  var i = e.charAt(n),
                    a = e.charAt(n + 1);
                  if (i === r && a === r) n++, (t += r);
                  else if ('\\' === i) {
                    if (
                      -1 ===
                      [
                        'a',
                        'b',
                        'f',
                        'n',
                        'r',
                        't',
                        'v',
                        "'",
                        '"',
                        '\\',
                        'a',
                        '\b',
                        '\f',
                        '\n',
                        '\r',
                        '\t',
                        '\v',
                      ].indexOf(a)
                    )
                      return null;
                    switch (((n += 1), a)) {
                      case 'a':
                        t += 'a';
                        break;
                      case 'b':
                        t += '\b';
                        break;
                      case 'f':
                        t += '\f';
                        break;
                      case 'n':
                        t += '\n';
                        break;
                      case 'r':
                        t += '\r';
                        break;
                      case 't':
                        t += '\t';
                        break;
                      case 'v':
                        t += '\v';
                        break;
                      case "'":
                        t += "'";
                        break;
                      case '"':
                        t += '"';
                        break;
                      case '\\':
                        t += '\\';
                    }
                  } else t += i;
                }
                return t;
              }
              function y(e) {
                var r,
                  t,
                  n,
                  i = e.substr(2);
                switch (e.substr(0, 2).toLowerCase()) {
                  case '0x':
                    return parseInt(i, 16);
                  case '0b':
                    return parseInt(i, 2);
                  case '0o':
                    return parseInt(i, 8);
                  case "0'":
                    return ((r = i),
                    (t = []),
                    (n = !1),
                    r.replace(
                      l,
                      function (
                        e,
                        r,
                        i,
                        a,
                        o,
                        p,
                        l,
                        c,
                        y,
                        _,
                        f,
                        d,
                        w,
                        h,
                        g,
                        m,
                        v,
                      ) {
                        switch (!0) {
                          case void 0 !== y:
                            return t.push(parseInt(y, 16)), '';
                          case void 0 !== _:
                            return t.push(parseInt(_, 8)), '';
                          case void 0 !== f:
                          case void 0 !== d:
                          case void 0 !== w:
                          case void 0 !== h:
                          case void 0 !== g:
                            return t.push(s(e.substr(1), 0)), '';
                          case void 0 !== v:
                            return t.push(s(v, 0)), '';
                          case void 0 !== m:
                            n = !0;
                          default:
                            return t.push(u[e]), '';
                        }
                      },
                    ),
                    n ? null : t)[0];
                  default:
                    return parseFloat(e);
                }
              }
              var _ = {
                whitespace: /^\s*(?:(?:%.*)|(?:\/\*(?:\n|\r|.)*?\*\/)|(?:\s+))\s*/,
                variable: /^(?:[A-Z_][a-zA-Z0-9_]*)/,
                atom: /^(\!|,|;|[a-z][0-9a-zA-Z_]*|[#\$\&\*\+\-\.\/\:\<\=\>\?\@\^\~\\]+|'(?:[^']*?(?:\\(?:x?\d+)?\\)*(?:'')*(?:\\')*)*')/,
                number: /^(?:0o[0-7]+|0x[0-9a-fA-F]+|0b[01]+|0'(?:''|\\[abfnrtv\\'"`]|\\x?\d+\\|[^\\])|\d+(?:\.\d+(?:[eE][+-]?\d+)?)?)/,
                string: /^(?:"([^"]|""|\\")*"|`([^`]|``|\\`)*`)/,
                l_brace: /^(?:\[)/,
                r_brace: /^(?:\])/,
                l_bracket: /^(?:\{)/,
                r_bracket: /^(?:\})/,
                bar: /^(?:\|)/,
                l_paren: /^(?:\()/,
                r_paren: /^(?:\))/,
              };
              function f(e) {
                (this.thread = e), (this.text = ''), (this.tokens = []);
              }
              function d(e, r, t, n, i) {
                if (!r[t])
                  return {
                    type: 0,
                    value: A.error.syntax(r[t - 1], 'expression expected', !0),
                  };
                if ('0' === n) {
                  switch ((c = r[t]).name) {
                    case 'number':
                      return {
                        type: 1,
                        len: t + 1,
                        value: new A.type.Num(c.value, c.float),
                      };
                    case 'variable':
                      return {
                        type: 1,
                        len: t + 1,
                        value: new A.type.Var(c.value),
                      };
                    case 'string':
                      var a;
                      switch (e.get_flag('double_quotes').id) {
                        case 'atom':
                          a = new k(c.value, []);
                          break;
                        case 'codes':
                          a = new k('[]', []);
                          for (var o = c.value.length - 1; o >= 0; o--)
                            a = new k('.', [
                              new A.type.Num(s(c.value, o), !1),
                              a,
                            ]);
                          break;
                        case 'chars':
                          a = new k('[]', []);
                          for (o = c.value.length - 1; o >= 0; o--)
                            a = new k('.', [
                              new A.type.Term(c.value.charAt(o), []),
                              a,
                            ]);
                      }
                      return { type: 1, len: t + 1, value: a };
                    case 'l_paren':
                      return 1 !==
                        (y = d(e, r, t + 1, e.__get_max_priority(), !0)).type
                        ? y
                        : r[y.len] && 'r_paren' === r[y.len].name
                        ? (y.len++, y)
                        : {
                            type: 0,
                            derived: !0,
                            value: A.error.syntax(
                              r[y.len] ? r[y.len] : r[y.len - 1],
                              ') or operator expected',
                              !r[y.len],
                            ),
                          };
                    case 'l_bracket':
                      return 1 !==
                        (y = d(e, r, t + 1, e.__get_max_priority(), !0)).type
                        ? y
                        : r[y.len] && 'r_bracket' === r[y.len].name
                        ? (y.len++, (y.value = new k('{}', [y.value])), y)
                        : {
                            type: 0,
                            derived: !0,
                            value: A.error.syntax(
                              r[y.len] ? r[y.len] : r[y.len - 1],
                              '} or operator expected',
                              !r[y.len],
                            ),
                          };
                  }
                  var p = (function (e, r, t, n) {
                    if (
                      !r[t] ||
                      ('atom' === r[t].name &&
                        '.' === r[t].raw &&
                        !n &&
                        (r[t].space ||
                          !r[t + 1] ||
                          'l_paren' !== r[t + 1].name))
                    )
                      return {
                        type: 0,
                        derived: !1,
                        value: A.error.syntax(r[t - 1], 'unfounded token'),
                      };
                    var i = r[t],
                      a = [];
                    if ('atom' === r[t].name && ',' !== r[t].raw) {
                      if ((t++, r[t - 1].space))
                        return {
                          type: 1,
                          len: t,
                          value: new A.type.Term(i.value, a),
                        };
                      if (r[t] && 'l_paren' === r[t].name) {
                        if (r[t + 1] && 'r_paren' === r[t + 1].name)
                          return {
                            type: 0,
                            derived: !0,
                            value: A.error.syntax(
                              r[t + 1],
                              'argument expected',
                            ),
                          };
                        var s = d(e, r, ++t, '999', !0);
                        if (0 === s.type)
                          return s.derived
                            ? s
                            : {
                                type: 0,
                                derived: !0,
                                value: A.error.syntax(
                                  r[t] ? r[t] : r[t - 1],
                                  'argument expected',
                                  !r[t],
                                ),
                              };
                        for (
                          a.push(s.value), t = s.len;
                          r[t] && 'atom' === r[t].name && ',' === r[t].value;

                        ) {
                          if (0 === (s = d(e, r, t + 1, '999', !0)).type)
                            return s.derived
                              ? s
                              : {
                                  type: 0,
                                  derived: !0,
                                  value: A.error.syntax(
                                    r[t + 1] ? r[t + 1] : r[t],
                                    'argument expected',
                                    !r[t + 1],
                                  ),
                                };
                          a.push(s.value), (t = s.len);
                        }
                        if (!r[t] || 'r_paren' !== r[t].name)
                          return {
                            type: 0,
                            derived: !0,
                            value: A.error.syntax(
                              r[t] ? r[t] : r[t - 1],
                              ', or ) expected',
                              !r[t],
                            ),
                          };
                        t++;
                      }
                      return {
                        type: 1,
                        len: t,
                        value: new A.type.Term(i.value, a),
                      };
                    }
                    return {
                      type: 0,
                      derived: !1,
                      value: A.error.syntax(r[t], 'term expected'),
                    };
                  })(e, r, t, i);
                  return 1 === p.type ||
                    p.derived ||
                    1 ===
                      (p = (function (e, r, t) {
                        if (!r[t])
                          return {
                            type: 0,
                            derived: !1,
                            value: A.error.syntax(r[t - 1], '[ expected'),
                          };
                        if (r[t] && 'l_brace' === r[t].name) {
                          var n = d(e, r, ++t, '999', !0),
                            i = [n.value],
                            a = void 0;
                          if (0 === n.type)
                            return r[t] && 'r_brace' === r[t].name
                              ? {
                                  type: 1,
                                  len: t + 1,
                                  value: new A.type.Term('[]', []),
                                }
                              : {
                                  type: 0,
                                  derived: !0,
                                  value: A.error.syntax(r[t], '] expected'),
                                };
                          for (
                            t = n.len;
                            r[t] && 'atom' === r[t].name && ',' === r[t].value;

                          ) {
                            if (0 === (n = d(e, r, t + 1, '999', !0)).type)
                              return n.derived
                                ? n
                                : {
                                    type: 0,
                                    derived: !0,
                                    value: A.error.syntax(
                                      r[t + 1] ? r[t + 1] : r[t],
                                      'argument expected',
                                      !r[t + 1],
                                    ),
                                  };
                            i.push(n.value), (t = n.len);
                          }
                          var s = !1;
                          if (r[t] && 'bar' === r[t].name) {
                            if (
                              ((s = !0),
                              0 === (n = d(e, r, t + 1, '999', !0)).type)
                            )
                              return n.derived
                                ? n
                                : {
                                    type: 0,
                                    derived: !0,
                                    value: A.error.syntax(
                                      r[t + 1] ? r[t + 1] : r[t],
                                      'argument expected',
                                      !r[t + 1],
                                    ),
                                  };
                            (a = n.value), (t = n.len);
                          }
                          return r[t] && 'r_brace' === r[t].name
                            ? { type: 1, len: t + 1, value: g(i, a) }
                            : {
                                type: 0,
                                derived: !0,
                                value: A.error.syntax(
                                  r[t] ? r[t] : r[t - 1],
                                  s ? '] expected' : ', or | or ] expected',
                                  !r[t],
                                ),
                              };
                        }
                        return {
                          type: 0,
                          derived: !1,
                          value: A.error.syntax(r[t], 'list expected'),
                        };
                      })(e, r, t)).type ||
                    p.derived
                    ? p
                    : {
                        type: 0,
                        derived: !1,
                        value: A.error.syntax(r[t], 'unexpected token'),
                      };
                }
                e.__get_max_priority();
                var l = e.__get_next_priority(n),
                  u = t;
                if (
                  'atom' === r[t].name &&
                  r[t + 1] &&
                  (r[t].space || 'l_paren' !== r[t + 1].name)
                ) {
                  var c = r[t++];
                  if (
                    (w = e.__lookup_operator_classes(n, c.value)) &&
                    w.indexOf('fy') > -1
                  ) {
                    if (0 !== (y = d(e, r, t, n, i)).type)
                      return '-' === c.value &&
                        !c.space &&
                        A.type.is_number(y.value)
                        ? {
                            value: new A.type.Num(
                              -y.value.value,
                              y.value.is_float,
                            ),
                            len: y.len,
                            type: 1,
                          }
                        : {
                            value: new A.type.Term(c.value, [y.value]),
                            len: y.len,
                            type: 1,
                          };
                    y;
                  } else if (w && w.indexOf('fx') > -1) {
                    var y;
                    if (0 !== (y = d(e, r, t, l, i)).type)
                      return {
                        value: new A.type.Term(c.value, [y.value]),
                        len: y.len,
                        type: 1,
                      };
                    y;
                  }
                }
                if (1 === (y = d(e, r, (t = u), l, i)).type) {
                  c = r[(t = y.len)];
                  if (
                    r[t] &&
                    (('atom' === r[t].name &&
                      e.__lookup_operator_classes(n, c.value)) ||
                      ('bar' === r[t].name &&
                        e.__lookup_operator_classes(n, '|')))
                  ) {
                    var _ = l,
                      f = n;
                    if (
                      (w = e.__lookup_operator_classes(n, c.value)).indexOf(
                        'xf',
                      ) > -1
                    )
                      return {
                        value: new A.type.Term(c.value, [y.value]),
                        len: ++y.len,
                        type: 1,
                      };
                    if (w.indexOf('xfx') > -1)
                      return 1 === (h = d(e, r, t + 1, _, i)).type
                        ? {
                            value: new A.type.Term(c.value, [y.value, h.value]),
                            len: h.len,
                            type: 1,
                          }
                        : ((h.derived = !0), h);
                    if (w.indexOf('xfy') > -1)
                      return 1 === (h = d(e, r, t + 1, f, i)).type
                        ? {
                            value: new A.type.Term(c.value, [y.value, h.value]),
                            len: h.len,
                            type: 1,
                          }
                        : ((h.derived = !0), h);
                    if (0 !== y.type)
                      for (;;) {
                        var w;
                        if (
                          !(c = r[(t = y.len)]) ||
                          'atom' !== c.name ||
                          !e.__lookup_operator_classes(n, c.value)
                        )
                          break;
                        if (
                          (w = e.__lookup_operator_classes(n, c.value)).indexOf(
                            'yf',
                          ) > -1
                        )
                          y = {
                            value: new A.type.Term(c.value, [y.value]),
                            len: ++t,
                            type: 1,
                          };
                        else {
                          if (!(w.indexOf('yfx') > -1)) break;
                          var h;
                          if (0 === (h = d(e, r, ++t, _, i)).type)
                            return (h.derived = !0), h;
                          (t = h.len),
                            (y = {
                              value: new A.type.Term(c.value, [
                                y.value,
                                h.value,
                              ]),
                              len: t,
                              type: 1,
                            });
                        }
                      }
                  } else
                    ({
                      type: 0,
                      value: A.error.syntax(r[y.len - 1], 'operator expected'),
                    });
                  return y;
                }
                return y;
              }
              function w(e, r, t) {
                var n,
                  i = r[t].line,
                  a = d(e, r, t, e.__get_max_priority(), !1),
                  s = null;
                if (0 !== a.type) {
                  if (
                    r[(t = a.len)] &&
                    'atom' === r[t].name &&
                    '.' === r[t].raw
                  ) {
                    if ((t++, A.type.is_term(a.value))) {
                      if (
                        (':-/2' === a.value.indicator
                          ? (n = {
                              value: (s = new A.type.Rule(
                                a.value.args[0],
                                h(a.value.args[1]),
                              )),
                              len: t,
                              type: 1,
                            })
                          : '--\x3e/2' === a.value.indicator
                          ? (((s = (function (e, r) {
                              e = e.rename(r);
                              var t = r.next_free_variable(),
                                n = (function e(r, t, n) {
                                  var i;
                                  if (
                                    A.type.is_term(r) &&
                                    '!/0' === r.indicator
                                  )
                                    return { value: r, variable: t, error: !1 };
                                  if (
                                    A.type.is_term(r) &&
                                    ',/2' === r.indicator
                                  ) {
                                    var a = e(r.args[0], t, n);
                                    if (a.error) return a;
                                    var s = e(r.args[1], a.variable, n);
                                    return s.error
                                      ? s
                                      : {
                                          value: new k(',', [a.value, s.value]),
                                          variable: s.variable,
                                          error: !1,
                                        };
                                  }
                                  if (
                                    A.type.is_term(r) &&
                                    '{}/1' === r.indicator
                                  )
                                    return {
                                      value: r.args[0],
                                      variable: t,
                                      error: !1,
                                    };
                                  if (A.type.is_empty_list(r))
                                    return {
                                      value: new k('true', []),
                                      variable: t,
                                      error: !1,
                                    };
                                  if (A.type.is_list(r)) {
                                    i = n.next_free_variable();
                                    for (var o, p = r; './2' === p.indicator; )
                                      (o = p), (p = p.args[1]);
                                    return A.type.is_variable(p)
                                      ? {
                                          value: A.error.instantiation('DCG'),
                                          variable: t,
                                          error: !0,
                                        }
                                      : A.type.is_empty_list(p)
                                      ? ((o.args[1] = i),
                                        {
                                          value: new k('=', [t, r]),
                                          variable: i,
                                          error: !1,
                                        })
                                      : {
                                          value: A.error.type('list', r, 'DCG'),
                                          variable: t,
                                          error: !0,
                                        };
                                  }
                                  return A.type.is_callable(r)
                                    ? ((i = n.next_free_variable()),
                                      (r.args = r.args.concat([t, i])),
                                      {
                                        value: (r = new k(r.id, r.args)),
                                        variable: i,
                                        error: !1,
                                      })
                                    : {
                                        value: A.error.type(
                                          'callable',
                                          r,
                                          'DCG',
                                        ),
                                        variable: t,
                                        error: !0,
                                      };
                                })(e.body, t, r);
                              return n.error
                                ? n.value
                                : ((e.body = n.value),
                                  (e.head.args = e.head.args.concat([
                                    t,
                                    n.variable,
                                  ])),
                                  (e.head = new k(e.head.id, e.head.args)),
                                  e);
                            })(
                              new A.type.Rule(a.value.args[0], a.value.args[1]),
                              e,
                            )).body = h(s.body)),
                            (n = {
                              value: s,
                              len: t,
                              type: A.type.is_rule(s) ? 1 : 0,
                            }))
                          : (n = {
                              value: (s = new A.type.Rule(a.value, null)),
                              len: t,
                              type: 1,
                            }),
                        s)
                      ) {
                        var o = s.singleton_variables();
                        o.length > 0 &&
                          e.throw_warning(
                            A.warning.singleton(o, s.head.indicator, i),
                          );
                      }
                      return n;
                    }
                    return {
                      type: 0,
                      value: A.error.syntax(r[t], 'callable expected'),
                    };
                  }
                  return {
                    type: 0,
                    value: A.error.syntax(
                      r[t] ? r[t] : r[t - 1],
                      '. or operator expected',
                    ),
                  };
                }
                return a;
              }
              function h(e) {
                return A.type.is_variable(e)
                  ? new k('call', [e])
                  : A.type.is_term(e) &&
                    -1 !== [',/2', ';/2', '->/2'].indexOf(e.indicator)
                  ? new k(e.id, [h(e.args[0]), h(e.args[1])])
                  : e;
              }
              function g(e, r) {
                for (
                  var t = r || new A.type.Term('[]', []), n = e.length - 1;
                  n >= 0;
                  n--
                )
                  t = new A.type.Term('.', [e[n], t]);
                return t;
              }
              function m(e) {
                for (var r = {}, t = [], n = 0; n < e.length; n++)
                  e[n] in r || (t.push(e[n]), (r[e[n]] = !0));
                return t;
              }
              function v(e) {
                return function (r, t, n) {
                  var i = n.args[0],
                    a = n.args.slice(1, e);
                  if (A.type.is_variable(i))
                    r.throw_error(A.error.instantiation(r.level));
                  else if (A.type.is_callable(i)) {
                    var s = new k(i.id, i.args.concat(a));
                    r.prepend([new P(t.goal.replace(s), t.substitution, t)]);
                  } else r.throw_error(A.error.type('callable', i, r.level));
                };
              }
              function b(e) {
                for (var r = e.length - 1; r >= 0; r--)
                  if ('/' === e.charAt(r))
                    return new k('/', [
                      new k(e.substring(0, r)),
                      new T(parseInt(e.substring(r + 1)), !1),
                    ]);
              }
              function x(e) {
                this.id = e;
              }
              function T(e, r) {
                (this.is_float = void 0 !== r ? r : parseInt(e) !== e),
                  (this.value = this.is_float ? e : parseInt(e));
              }
              (f.prototype.set_last_tokens = function (e) {
                return (this.tokens = e);
              }),
                (f.prototype.new_text = function (e) {
                  (this.text = e), (this.tokens = []);
                }),
                (f.prototype.get_tokens = function (e) {
                  var r,
                    t = 0,
                    n = 0,
                    i = 0,
                    a = [];
                  e
                    ? ((t = (f = this.tokens[e - 1]).len),
                      (r = (function (e, r) {
                        return 'on' === e.get_flag('char_conversion').id
                          ? r.replace(/./g, function (r) {
                              return e.get_char_conversion(r);
                            })
                          : r;
                      })(this.thread, this.text.substr(f.len))),
                      (n = f.line),
                      (i = f.start))
                    : (r = this.text);
                  if (/^\s*$/.test(r)) return null;
                  for (; '' !== r; ) {
                    var s = [],
                      o = !1;
                    if (null === /^\n/.exec(r)) {
                      for (var l in _)
                        if (_.hasOwnProperty(l)) {
                          var u = _[l].exec(r);
                          u && s.push({ value: u[0], name: l, matches: u });
                        }
                      if (!s.length)
                        return this.set_last_tokens([
                          {
                            value: r,
                            matches: [],
                            name: 'lexical',
                            line: n,
                            start: i,
                          },
                        ]);
                      var f;
                      switch (
                        (((f = p(s, function (e, r) {
                          return e.value.length >= r.value.length ? e : r;
                        })).start = i),
                        (f.line = n),
                        (r = r.replace(f.value, '')),
                        (i += f.value.length),
                        (t += f.value.length),
                        f.name)
                      ) {
                        case 'atom':
                          (f.raw = f.value),
                            "'" === f.value.charAt(0) &&
                              ((f.value = c(
                                f.value.substr(1, f.value.length - 2),
                                "'",
                              )),
                              null === f.value &&
                                ((f.name = 'lexical'),
                                (f.value = 'unknown escape sequence')));
                          break;
                        case 'number':
                          (f.float =
                            '0x' !== f.value.substring(0, 2) &&
                            null !== f.value.match(/[.eE]/) &&
                            "0'." !== f.value),
                            (f.value = y(f.value)),
                            (f.blank = o);
                          break;
                        case 'string':
                          var d = f.value.charAt(0);
                          (f.value = c(
                            f.value.substr(1, f.value.length - 2),
                            d,
                          )),
                            null === f.value &&
                              ((f.name = 'lexical'),
                              (f.value = 'unknown escape sequence'));
                          break;
                        case 'whitespace':
                          var w = a[a.length - 1];
                          w && (w.space = !0), (o = !0);
                          continue;
                        case 'r_bracket':
                          a.length > 0 &&
                            'l_bracket' === a[a.length - 1].name &&
                            (((f = a.pop()).name = 'atom'),
                            (f.value = '{}'),
                            (f.raw = '{}'),
                            (f.space = !1));
                          break;
                        case 'r_brace':
                          a.length > 0 &&
                            'l_brace' === a[a.length - 1].name &&
                            (((f = a.pop()).name = 'atom'),
                            (f.value = '[]'),
                            (f.raw = '[]'),
                            (f.space = !1));
                      }
                      (f.len = t), a.push(f), (o = !1);
                    } else n++, (i = 0), t++, (r = r.replace(/\n/, '')), !0;
                  }
                  var h = this.set_last_tokens(a);
                  return 0 === h.length ? null : h;
                });
              var V = 0;
              function k(e, r, t) {
                (this.ref = t || ++V),
                  (this.id = e),
                  (this.args = r || []),
                  (this.indicator = e + '/' + this.args.length);
              }
              var S = 0;
              function O(e, r, t, n, i, a) {
                (this.id = S++),
                  (this.stream = e),
                  (this.mode = r),
                  (this.alias = t),
                  (this.type = void 0 !== n ? n : 'text'),
                  (this.reposition = void 0 === i || i),
                  (this.eof_action = void 0 !== a ? a : 'eof_code'),
                  (this.position =
                    'append' === this.mode ? 'end_of_stream' : 0),
                  (this.output =
                    'write' === this.mode || 'append' === this.mode),
                  (this.input = 'read' === this.mode);
              }
              function E(e) {
                (e = e || {}), (this.links = e);
              }
              function P(e, r, t) {
                (r = r || new E()),
                  (t = t || null),
                  (this.goal = e),
                  (this.substitution = r),
                  (this.parent = t);
              }
              function C(e, r, t) {
                (this.head = e), (this.body = r), (this.dynamic = t || !1);
              }
              function I(r) {
                (r = void 0 === r || r <= 0 ? 1e3 : r),
                  (this.rules = {}),
                  (this.src_predicates = {}),
                  (this.rename = 0),
                  (this.modules = []),
                  (this.thread = new N(this)),
                  (this.total_threads = 1),
                  (this.renamed_variables = {}),
                  (this.public_predicates = {}),
                  (this.multifile_predicates = {}),
                  (this.limit = r),
                  (this.streams = {
                    user_input: new O(
                      e.exports ? nodejs_user_input : tau_user_input,
                      'read',
                      'user_input',
                      'text',
                      !1,
                      'reset',
                    ),
                    user_output: new O(
                      e.exports ? nodejs_user_output : tau_user_output,
                      'write',
                      'user_output',
                      'text',
                      !1,
                      'eof_code',
                    ),
                  }),
                  (this.file_system = e.exports
                    ? nodejs_file_system
                    : tau_file_system),
                  (this.standard_input = this.streams.user_input),
                  (this.standard_output = this.streams.user_output),
                  (this.current_input = this.streams.user_input),
                  (this.current_output = this.streams.user_output),
                  (this.format_success = function (e) {
                    return e.substitution;
                  }),
                  (this.format_error = function (e) {
                    return e.goal;
                  }),
                  (this.flag = {
                    bounded: A.flag.bounded.value,
                    max_integer: A.flag.max_integer.value,
                    min_integer: A.flag.min_integer.value,
                    integer_rounding_function:
                      A.flag.integer_rounding_function.value,
                    char_conversion: A.flag.char_conversion.value,
                    debug: A.flag.debug.value,
                    max_arity: A.flag.max_arity.value,
                    unknown: A.flag.unknown.value,
                    double_quotes: A.flag.double_quotes.value,
                    occurs_check: A.flag.occurs_check.value,
                    dialect: A.flag.dialect.value,
                    version_data: A.flag.version_data.value,
                    nodejs: A.flag.nodejs.value,
                  }),
                  (this.__loaded_modules = []),
                  (this.__char_conversion = {}),
                  (this.__operators = {
                    1200: {
                      ':-': ['fx', 'xfx'],
                      '--\x3e': ['xfx'],
                      '?-': ['fx'],
                    },
                    1100: { ';': ['xfy'] },
                    1050: { '->': ['xfy'] },
                    1e3: { ',': ['xfy'] },
                    900: { '\\+': ['fy'] },
                    700: {
                      '=': ['xfx'],
                      '\\=': ['xfx'],
                      '==': ['xfx'],
                      '\\==': ['xfx'],
                      '@<': ['xfx'],
                      '@=<': ['xfx'],
                      '@>': ['xfx'],
                      '@>=': ['xfx'],
                      '=..': ['xfx'],
                      'is': ['xfx'],
                      '=:=': ['xfx'],
                      '=\\=': ['xfx'],
                      '<': ['xfx'],
                      '=<': ['xfx'],
                      '>': ['xfx'],
                      '>=': ['xfx'],
                    },
                    600: { ':': ['xfy'] },
                    500: {
                      '+': ['yfx'],
                      '-': ['yfx'],
                      '/\\': ['yfx'],
                      '\\/': ['yfx'],
                    },
                    400: {
                      '*': ['yfx'],
                      '/': ['yfx'],
                      '//': ['yfx'],
                      'rem': ['yfx'],
                      'mod': ['yfx'],
                      '<<': ['yfx'],
                      '>>': ['yfx'],
                    },
                    200: {
                      '**': ['xfx'],
                      '^': ['xfy'],
                      '-': ['fy'],
                      '+': ['fy'],
                      '\\': ['fy'],
                    },
                  });
              }
              function N(e) {
                (this.epoch = Date.now()),
                  (this.session = e),
                  this.session.total_threads++,
                  (this.total_steps = 0),
                  (this.cpu_time = 0),
                  (this.cpu_time_last = 0),
                  (this.points = []),
                  (this.debugger = !1),
                  (this.debugger_states = []),
                  (this.level = 'top_level/0'),
                  (this.__calls = []),
                  (this.current_limit = this.session.limit),
                  (this.warnings = []);
              }
              function R(e, r, t) {
                (this.id = e),
                  (this.rules = r),
                  (this.exports = t),
                  (A.module[e] = this);
              }
              (R.prototype.exports_predicate = function (e) {
                return -1 !== this.exports.indexOf(e);
              }),
                (x.prototype.unify = function (e, t) {
                  if (
                    t &&
                    -1 !== r(e.variables(), this.id) &&
                    !A.type.is_variable(e)
                  )
                    return null;
                  var n = {};
                  return (n[this.id] = e), new E(n);
                }),
                (T.prototype.unify = function (e, r) {
                  return A.type.is_number(e) &&
                    this.value === e.value &&
                    this.is_float === e.is_float
                    ? new E()
                    : null;
                }),
                (k.prototype.unify = function (e, r) {
                  if (A.type.is_term(e) && this.indicator === e.indicator) {
                    for (var t = new E(), n = 0; n < this.args.length; n++) {
                      var i = A.unify(
                        this.args[n].apply(t),
                        e.args[n].apply(t),
                        r,
                      );
                      if (null === i) return null;
                      for (var a in i.links) t.links[a] = i.links[a];
                      t = t.apply(i);
                    }
                    return t;
                  }
                  return null;
                }),
                (O.prototype.unify = function (e, r) {
                  return A.type.is_stream(e) && this.id === e.id
                    ? new E()
                    : null;
                }),
                (x.prototype.toString = function (e) {
                  return this.id;
                }),
                (T.prototype.toString = function (e) {
                  return this.is_float && -1 === r(this.value.toString(), '.')
                    ? this.value + '.0'
                    : this.value.toString();
                }),
                (k.prototype.toString = function (e, r, t) {
                  if (
                    (((e = e || {}).quoted = void 0 === e.quoted || e.quoted),
                    (e.ignore_ops = void 0 !== e.ignore_ops && e.ignore_ops),
                    (e.numbervars = void 0 !== e.numbervars && e.numbervars),
                    (r = void 0 === r ? 1200 : r),
                    (t = void 0 === t ? '' : t),
                    e.numbervars &&
                      '$VAR/1' === this.indicator &&
                      A.type.is_integer(this.args[0]) &&
                      this.args[0].value >= 0)
                  ) {
                    var n = this.args[0].value,
                      a = Math.floor(n / 26);
                    return (
                      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26] + (0 !== a ? a : '')
                    );
                  }
                  switch (this.indicator) {
                    case '[]/0':
                    case '{}/0':
                    case '!/0':
                      return this.id;
                    case '{}/1':
                      return '{' + this.args[0].toString(e) + '}';
                    case './2':
                      for (
                        var s = '[' + this.args[0].toString(e),
                          o = this.args[1];
                        './2' === o.indicator;

                      )
                        (s += ', ' + o.args[0].toString(e)), (o = o.args[1]);
                      return (
                        '[]/0' !== o.indicator && (s += '|' + o.toString(e)),
                        (s += ']')
                      );
                    case ',/2':
                      return (
                        '(' +
                        this.args[0].toString(e) +
                        ', ' +
                        this.args[1].toString(e) +
                        ')'
                      );
                    default:
                      var p = this.id,
                        l = e.session
                          ? e.session.lookup_operator(this.id, this.args.length)
                          : null;
                      if (void 0 === e.session || e.ignore_ops || null === l)
                        return (
                          e.quoted &&
                            !/^(!|,|;|[a-z][0-9a-zA-Z_]*)$/.test(p) &&
                            '{}' !== p &&
                            '[]' !== p &&
                            (p =
                              "'" +
                              (function (e) {
                                for (var r = '', t = 0; t < e.length; t++)
                                  switch (e.charAt(t)) {
                                    case "'":
                                      r += "\\'";
                                      break;
                                    case '\\':
                                      r += '\\\\';
                                      break;
                                    case '\b':
                                      r += '\\b';
                                      break;
                                    case '\f':
                                      r += '\\f';
                                      break;
                                    case '\n':
                                      r += '\\n';
                                      break;
                                    case '\r':
                                      r += '\\r';
                                      break;
                                    case '\t':
                                      r += '\\t';
                                      break;
                                    case '\v':
                                      r += '\\v';
                                      break;
                                    default:
                                      r += e.charAt(t);
                                  }
                                return r;
                              })(p) +
                              "'"),
                          p +
                            (this.args.length
                              ? '(' +
                                i(this.args, function (r) {
                                  return r.toString(e);
                                }).join(', ') +
                                ')'
                              : '')
                        );
                      var u =
                        l.priority > r.priority ||
                        (l.priority === r.priority &&
                          (('xfy' === l.class &&
                            this.indicator !== r.indicator) ||
                            ('yfx' === l.class &&
                              this.indicator !== r.indicator) ||
                            (this.indicator === r.indicator &&
                              'yfx' === l.class &&
                              'right' === t) ||
                            (this.indicator === r.indicator &&
                              'xfy' === l.class &&
                              'left' === t)));
                      l.indicator = this.indicator;
                      var c = u ? '(' : '',
                        y = u ? ')' : '';
                      return 0 === this.args.length
                        ? '(' + this.id + ')'
                        : -1 !== ['fy', 'fx'].indexOf(l.class)
                        ? c + p + ' ' + this.args[0].toString(e, l) + y
                        : -1 !== ['yf', 'xf'].indexOf(l.class)
                        ? c + this.args[0].toString(e, l) + ' ' + p + y
                        : c +
                          this.args[0].toString(e, l, 'left') +
                          ' ' +
                          this.id +
                          ' ' +
                          this.args[1].toString(e, l, 'right') +
                          y;
                  }
                }),
                (O.prototype.toString = function (e) {
                  return '<stream>(' + this.id + ')';
                }),
                (E.prototype.toString = function (e) {
                  var r = '{';
                  for (var t in this.links)
                    this.links.hasOwnProperty(t) &&
                      ('{' !== r && (r += ', '),
                      (r += t + '/' + this.links[t].toString(e)));
                  return (r += '}');
                }),
                (P.prototype.toString = function (e) {
                  return null === this.goal
                    ? '<' + this.substitution.toString(e) + '>'
                    : '<' +
                        this.goal.toString(e) +
                        ', ' +
                        this.substitution.toString(e) +
                        '>';
                }),
                (C.prototype.toString = function (e) {
                  return this.body
                    ? this.head.toString(e) +
                        ' :- ' +
                        this.body.toString(e) +
                        '.'
                    : this.head.toString(e) + '.';
                }),
                (I.prototype.toString = function (e) {
                  for (var r = '', t = 0; t < this.modules.length; t++)
                    r += ':- use_module(library(' + this.modules[t] + ')).\n';
                  for (key in ((r += '\n'), this.rules))
                    for (t = 0; t < this.rules[key].length; t++)
                      (r += this.rules[key][t].toString(e)), (r += '\n');
                  return r;
                }),
                (x.prototype.clone = function () {
                  return new x(this.id);
                }),
                (T.prototype.clone = function () {
                  return new T(this.value, this.is_float);
                }),
                (k.prototype.clone = function () {
                  return new k(
                    this.id,
                    i(this.args, function (e) {
                      return e.clone();
                    }),
                  );
                }),
                (O.prototype.clone = function () {
                  return new Stram(
                    this.stream,
                    this.mode,
                    this.alias,
                    this.type,
                    this.reposition,
                    this.eof_action,
                  );
                }),
                (E.prototype.clone = function () {
                  var e = {};
                  for (var r in this.links)
                    this.links.hasOwnProperty(r) &&
                      (e[r] = this.links[r].clone());
                  return new E(e);
                }),
                (P.prototype.clone = function () {
                  return new P(
                    this.goal.clone(),
                    this.substitution.clone(),
                    this.parent,
                  );
                }),
                (C.prototype.clone = function () {
                  return new C(
                    this.head.clone(),
                    null !== this.body ? this.body.clone() : null,
                  );
                }),
                (x.prototype.equals = function (e) {
                  return A.type.is_variable(e) && this.id === e.id;
                }),
                (T.prototype.equals = function (e) {
                  return (
                    A.type.is_number(e) &&
                    this.value === e.value &&
                    this.is_float === e.is_float
                  );
                }),
                (k.prototype.equals = function (e) {
                  if (!A.type.is_term(e) || this.indicator !== e.indicator)
                    return !1;
                  for (var r = 0; r < this.args.length; r++)
                    if (!this.args[r].equals(e.args[r])) return !1;
                  return !0;
                }),
                (O.prototype.equals = function (e) {
                  return A.type.is_stream(e) && this.id === e.id;
                }),
                (E.prototype.equals = function (e) {
                  var r;
                  if (!A.type.is_substitution(e)) return !1;
                  for (r in this.links)
                    if (
                      this.links.hasOwnProperty(r) &&
                      (!e.links[r] || !this.links[r].equals(e.links[r]))
                    )
                      return !1;
                  for (r in e.links)
                    if (e.links.hasOwnProperty(r) && !this.links[r]) return !1;
                  return !0;
                }),
                (P.prototype.equals = function (e) {
                  return (
                    A.type.is_state(e) &&
                    this.goal.equals(e.goal) &&
                    this.substitution.equals(e.substitution) &&
                    this.parent === e.parent
                  );
                }),
                (C.prototype.equals = function (e) {
                  return (
                    A.type.is_rule(e) &&
                    this.head.equals(e.head) &&
                    ((null === this.body && null === e.body) ||
                      (null !== this.body && this.body.equals(e.body)))
                  );
                }),
                (x.prototype.rename = function (e) {
                  return e.get_free_variable(this);
                }),
                (T.prototype.rename = function (e) {
                  return this;
                }),
                (k.prototype.rename = function (e) {
                  return new k(
                    this.id,
                    i(this.args, function (r) {
                      return r.rename(e);
                    }),
                  );
                }),
                (O.prototype.rename = function (e) {
                  return this;
                }),
                (C.prototype.rename = function (e) {
                  return new C(
                    this.head.rename(e),
                    null !== this.body ? this.body.rename(e) : null,
                  );
                }),
                (x.prototype.variables = function () {
                  return [this.id];
                }),
                (T.prototype.variables = function () {
                  return [];
                }),
                (k.prototype.variables = function () {
                  return [].concat.apply(
                    [],
                    i(this.args, function (e) {
                      return e.variables();
                    }),
                  );
                }),
                (O.prototype.variables = function () {
                  return [];
                }),
                (C.prototype.variables = function () {
                  return null === this.body
                    ? this.head.variables()
                    : this.head.variables().concat(this.body.variables());
                }),
                (x.prototype.apply = function (e) {
                  return e.lookup(this.id) ? e.lookup(this.id) : this;
                }),
                (T.prototype.apply = function (e) {
                  return this;
                }),
                (k.prototype.apply = function (e) {
                  if ('./2' === this.indicator) {
                    for (var r = [], t = this; './2' === t.indicator; )
                      r.push(t.args[0].apply(e)), (t = t.args[1]);
                    for (var n = t.apply(e), a = r.length - 1; a >= 0; a--)
                      n = new k('.', [r[a], n]);
                    return n;
                  }
                  return new k(
                    this.id,
                    i(this.args, function (r) {
                      return r.apply(e);
                    }),
                    this.ref,
                  );
                }),
                (O.prototype.apply = function (e) {
                  return this;
                }),
                (C.prototype.apply = function (e) {
                  return new C(
                    this.head.apply(e),
                    null !== this.body ? this.body.apply(e) : null,
                  );
                }),
                (E.prototype.apply = function (e) {
                  var r,
                    t = {};
                  for (r in this.links)
                    this.links.hasOwnProperty(r) &&
                      (t[r] = this.links[r].apply(e));
                  return new E(t);
                }),
                (k.prototype.select = function () {
                  for (var e = this; ',/2' === e.indicator; ) e = e.args[0];
                  return e;
                }),
                (k.prototype.replace = function (e) {
                  return ',/2' === this.indicator
                    ? ',/2' === this.args[0].indicator
                      ? new k(',', [this.args[0].replace(e), this.args[1]])
                      : null === e
                      ? this.args[1]
                      : new k(',', [e, this.args[1]])
                    : e;
                }),
                (k.prototype.search = function (e) {
                  if (
                    A.type.is_term(e) &&
                    void 0 !== e.ref &&
                    this.ref === e.ref
                  )
                    return !0;
                  for (var r = 0; r < this.args.length; r++)
                    if (A.type.is_term(this.args[r]) && this.args[r].search(e))
                      return !0;
                  return !1;
                }),
                (I.prototype.get_current_input = function () {
                  return this.current_input;
                }),
                (N.prototype.get_current_input = function () {
                  return this.session.get_current_input();
                }),
                (I.prototype.get_current_output = function () {
                  return this.current_output;
                }),
                (N.prototype.get_current_output = function () {
                  return this.session.get_current_output();
                }),
                (I.prototype.set_current_input = function (e) {
                  this.current_input = e;
                }),
                (N.prototype.set_current_input = function (e) {
                  return this.session.set_current_input(e);
                }),
                (I.prototype.set_current_output = function (e) {
                  this.current_input = e;
                }),
                (N.prototype.set_current_output = function (e) {
                  return this.session.set_current_output(e);
                }),
                (I.prototype.get_stream_by_alias = function (e) {
                  return this.streams[e];
                }),
                (N.prototype.get_stream_by_alias = function (e) {
                  return this.session.get_stream_by_alias(e);
                }),
                (I.prototype.file_system_open = function (e, r, t) {
                  return this.file_system.open(e, r, t);
                }),
                (N.prototype.file_system_open = function (e, r, t) {
                  return this.session.file_system_open(e, r, t);
                }),
                (I.prototype.get_char_conversion = function (e) {
                  return this.__char_conversion[e] || e;
                }),
                (N.prototype.get_char_conversion = function (e) {
                  return this.session.get_char_conversion(e);
                }),
                (I.prototype.parse = function (e) {
                  return this.thread.parse(e);
                }),
                (N.prototype.parse = function (e) {
                  var r = new f(this);
                  r.new_text(e);
                  var t = r.get_tokens();
                  if (null === t) return !1;
                  var n = d(this, t, 0, this.__get_max_priority(), !1);
                  return (
                    n.len === t.length && { value: n.value, expr: n, tokens: t }
                  );
                }),
                (I.prototype.get_flag = function (e) {
                  return this.flag[e];
                }),
                (N.prototype.get_flag = function (e) {
                  return this.session.get_flag(e);
                }),
                (I.prototype.add_rule = function (e, r) {
                  return (
                    ((r = r || {}).from = r.from ? r.from : '$tau-js'),
                    (this.src_predicates[e.head.indicator] = r.from),
                    this.rules[e.head.indicator] ||
                      (this.rules[e.head.indicator] = []),
                    this.rules[e.head.indicator].push(e),
                    this.public_predicates.hasOwnProperty(e.head.indicator) ||
                      (this.public_predicates[e.head.indicator] = !1),
                    !0
                  );
                }),
                (N.prototype.add_rule = function (e, r) {
                  return this.session.add_rule(e, r);
                }),
                (I.prototype.run_directive = function (e) {
                  this.thread.run_directive(e);
                }),
                (N.prototype.run_directive = function (e) {
                  return (
                    !!A.type.is_directive(e) &&
                    (A.directive[e.indicator](this, e), !0)
                  );
                }),
                (I.prototype.__get_max_priority = function () {
                  return '1200';
                }),
                (N.prototype.__get_max_priority = function () {
                  return this.session.__get_max_priority();
                }),
                (I.prototype.__get_next_priority = function (e) {
                  var r = 0;
                  for (var t in ((e = parseInt(e)), this.__operators))
                    if (this.__operators.hasOwnProperty(t)) {
                      var n = parseInt(t);
                      n > r && n < e && (r = n);
                    }
                  return r.toString();
                }),
                (N.prototype.__get_next_priority = function (e) {
                  return this.session.__get_next_priority(e);
                }),
                (I.prototype.__lookup_operator_classes = function (e, r) {
                  return (
                    (this.__operators.hasOwnProperty(e) &&
                      this.__operators[e][r] instanceof Array &&
                      this.__operators[e][r]) ||
                    !1
                  );
                }),
                (N.prototype.__lookup_operator_classes = function (e, r) {
                  return this.session.__lookup_operator_classes(e, r);
                }),
                (I.prototype.lookup_operator = function (e, r) {
                  for (var t in this.__operators)
                    if (this.__operators[t][e])
                      for (var n = 0; n < this.__operators[t][e].length; n++)
                        if (
                          0 === r ||
                          this.__operators[t][e][n].length === r + 1
                        )
                          return {
                            priority: t,
                            class: this.__operators[t][e][n],
                          };
                  return null;
                }),
                (N.prototype.lookup_operator = function (e, r) {
                  return this.session.lookup_operator(e, r);
                }),
                (I.prototype.throw_warning = function (e) {
                  this.thread.throw_warning(e);
                }),
                (N.prototype.throw_warning = function (e) {
                  this.warnings.push(e);
                }),
                (I.prototype.get_warnings = function () {
                  return this.thread.get_warnings();
                }),
                (N.prototype.get_warnings = function () {
                  return this.warnings;
                }),
                (I.prototype.add_goal = function (e, r) {
                  this.thread.add_goal(e, r);
                }),
                (N.prototype.add_goal = function (e, r, t) {
                  (t = t || null), !0 === r && (this.points = []);
                  for (var n = e.variables(), i = {}, a = 0; a < n.length; a++)
                    i[n[a]] = new x(n[a]);
                  this.points.push(new P(e, new E(i), t));
                }),
                (I.prototype.consult = function (e, r) {
                  return this.thread.consult(e, r);
                }),
                (N.prototype.consult = function (e, r) {
                  var t = '';
                  if ('string' == typeof e) {
                    var n = (t = e).length;
                    if (
                      '.pl' === t.substring(n - 3, n) &&
                      document.getElementById(t)
                    ) {
                      var i = document.getElementById(t),
                        s = i.getAttribute('type');
                      null !== s &&
                        'text/prolog' === s.replace(/ /g, '').toLowerCase() &&
                        (t = i.text);
                    }
                  } else {
                    if (!e.nodeName) return !1;
                    switch (e.nodeName.toLowerCase()) {
                      case 'input':
                      case 'textarea':
                        t = e.value;
                        break;
                      default:
                        t = e.innerHTML;
                    }
                  }
                  return (
                    (this.warnings = []),
                    (function (e, r, t) {
                      ((t = t || {}).from = t.from ? t.from : '$tau-js'),
                        (t.reconsult = void 0 === t.reconsult || t.reconsult);
                      var n,
                        i = new f(e),
                        s = {};
                      i.new_text(r);
                      for (var o = 0, p = i.get_tokens(o); ; ) {
                        if (null === p || !p[o]) break;
                        var l = w(e, p, o);
                        if (0 === l.type) return new k('throw', [l.value]);
                        if (
                          null === l.value.body &&
                          '?-/1' === l.value.head.indicator
                        ) {
                          var u = new N(e.session);
                          u.add_goal(l.value.head.args[0]),
                            u.answer(function (r) {
                              A.type.is_error(r)
                                ? e.throw_warning(r.args[0])
                                : (!1 !== r && null !== r) ||
                                  e.throw_warning(
                                    A.warning.failed_goal(
                                      l.value.head.args[0],
                                      l.len,
                                    ),
                                  );
                            }),
                            (o = l.len);
                          var c = !0;
                        } else if (
                          null === l.value.body &&
                          ':-/1' === l.value.head.indicator
                        ) {
                          c = e.run_directive(l.value.head.args[0]);
                          (o = l.len),
                            'char_conversion/2' ===
                              l.value.head.args[0].indicator &&
                              ((p = i.get_tokens(o)), (o = 0));
                        } else {
                          (n = l.value.head.indicator),
                            !1 === t.reconsult ||
                              !0 === s[n] ||
                              e.is_multifile_predicate(n) ||
                              ((e.session.rules[n] = a(
                                e.session.rules[n] || [],
                                function (e) {
                                  return e.dynamic;
                                },
                              )),
                              (s[n] = !0));
                          c = e.add_rule(l.value, t);
                          o = l.len;
                        }
                        if (!c) return c;
                      }
                      return !0;
                    })(this, t, r)
                  );
                }),
                (I.prototype.query = function (e) {
                  return this.thread.query(e);
                }),
                (N.prototype.query = function (e) {
                  return (
                    (this.points = []),
                    (this.debugger_points = []),
                    (function (e, r) {
                      var t = new f(e);
                      t.new_text(r);
                      for (var n = 0; ; ) {
                        var i = t.get_tokens(n);
                        if (null === i) break;
                        var a = d(e, i, 0, e.__get_max_priority(), !1);
                        if (0 === a.type) return new k('throw', [a.value]);
                        var s = a.len;
                        if (!i[s] || 'atom' !== i[s].name || '.' !== i[s].raw) {
                          var o = i[s];
                          return new k('throw', [
                            A.error.syntax(
                              o || i[s - 1],
                              '. or operator expected',
                              !o,
                            ),
                          ]);
                        }
                        e.add_goal(h(a.value)), (n = a.len + 1);
                      }
                      return !0;
                    })(this, e)
                  );
                }),
                (I.prototype.head_point = function () {
                  return this.thread.head_point();
                }),
                (N.prototype.head_point = function () {
                  return this.points[this.points.length - 1];
                }),
                (I.prototype.get_free_variable = function (e) {
                  return this.thread.get_free_variable(e);
                }),
                (N.prototype.get_free_variable = function (e) {
                  var t = [];
                  if (
                    '_' === e.id ||
                    void 0 === this.session.renamed_variables[e.id]
                  ) {
                    for (
                      this.session.rename++,
                        this.points.length > 0 &&
                          (t = this.head_point().substitution.domain());
                      -1 !== r(t, A.format_variable(this.session.rename));

                    )
                      this.session.rename++;
                    if ('_' === e.id)
                      return new x(A.format_variable(this.session.rename));
                    this.session.renamed_variables[e.id] = A.format_variable(
                      this.session.rename,
                    );
                  }
                  return new x(this.session.renamed_variables[e.id]);
                }),
                (I.prototype.next_free_variable = function () {
                  return this.thread.next_free_variable();
                }),
                (N.prototype.next_free_variable = function () {
                  this.session.rename++;
                  var e = [];
                  for (
                    this.points.length > 0 &&
                    (e = this.head_point().substitution.domain());
                    -1 !== r(e, A.format_variable(this.session.rename));

                  )
                    this.session.rename++;
                  return new x(A.format_variable(this.session.rename));
                }),
                (I.prototype.is_public_predicate = function (e) {
                  return (
                    !this.public_predicates.hasOwnProperty(e) ||
                    !0 === this.public_predicates[e]
                  );
                }),
                (N.prototype.is_public_predicate = function (e) {
                  return this.session.is_public_predicate(e);
                }),
                (I.prototype.is_multifile_predicate = function (e) {
                  return (
                    this.multifile_predicates.hasOwnProperty(e) &&
                    !0 === this.multifile_predicates[e]
                  );
                }),
                (N.prototype.is_multifile_predicate = function (e) {
                  return this.session.is_multifile_predicate(e);
                }),
                (I.prototype.prepend = function (e) {
                  return this.thread.prepend(e);
                }),
                (N.prototype.prepend = function (e) {
                  for (var r = e.length - 1; r >= 0; r--)
                    this.points.push(e[r]);
                }),
                (I.prototype.success = function (e, r) {
                  return this.thread.success(e, r);
                }),
                (N.prototype.success = function (e, r) {
                  r = void 0 === r ? e : r;
                  this.prepend([
                    new P(e.goal.replace(null), e.substitution, r),
                  ]);
                }),
                (I.prototype.throw_error = function (e) {
                  return this.thread.throw_error(e);
                }),
                (N.prototype.throw_error = function (e) {
                  this.prepend([
                    new P(new k('throw', [e]), new E(), null, null),
                  ]);
                }),
                (I.prototype.step_rule = function (e, r) {
                  return this.thread.step_rule(e, r);
                }),
                (N.prototype.step_rule = function (e, t) {
                  var n = t.indicator;
                  if (
                    ('user' === e && (e = null),
                    null === e && this.session.rules.hasOwnProperty(n))
                  )
                    return this.session.rules[n];
                  for (
                    var i =
                        null === e
                          ? this.session.modules
                          : -1 === r(this.session.modules, e)
                          ? []
                          : [e],
                      a = 0;
                    a < i.length;
                    a++
                  ) {
                    var s = A.module[i[a]];
                    if (
                      s.rules.hasOwnProperty(n) &&
                      (s.rules.hasOwnProperty(this.level) ||
                        s.exports_predicate(n))
                    )
                      return A.module[i[a]].rules[n];
                  }
                  return null;
                }),
                (I.prototype.step = function () {
                  return this.thread.step();
                }),
                (N.prototype.step = function () {
                  if (0 !== this.points.length) {
                    var e = !1,
                      r = this.points.pop();
                    if (
                      (this.debugger && this.debugger_states.push(r),
                      A.type.is_term(r.goal))
                    ) {
                      var t = r.goal.select(),
                        n = null,
                        i = [];
                      if (null !== t) {
                        this.total_steps++;
                        for (
                          var a = r;
                          null !== a.parent && a.parent.goal.search(t);

                        )
                          a = a.parent;
                        if (
                          ((this.level =
                            null === a.parent
                              ? 'top_level/0'
                              : a.parent.goal.select().indicator),
                          A.type.is_term(t) &&
                            ':/2' === t.indicator &&
                            ((n = t.args[0].id), (t = t.args[1])),
                          null === n && A.type.is_builtin(t))
                        )
                          (this.__call_indicator = t.indicator),
                            (e = A.predicate[t.indicator](this, r, t));
                        else {
                          var s = this.step_rule(n, t);
                          if (null === s)
                            this.session.rules.hasOwnProperty(t.indicator) ||
                              ('error' === this.get_flag('unknown').id
                                ? this.throw_error(
                                    A.error.existence(
                                      'procedure',
                                      t.indicator,
                                      this.level,
                                    ),
                                  )
                                : 'warning' === this.get_flag('unknown').id &&
                                  this.throw_warning(
                                    'unknown procedure ' +
                                      t.indicator +
                                      ' (from ' +
                                      this.level +
                                      ')',
                                  ));
                          else if (s instanceof Function) e = s(this, r, t);
                          else {
                            for (var o in s)
                              if (s.hasOwnProperty(o)) {
                                var p = s[o];
                                (this.session.renamed_variables = {}),
                                  (p = p.rename(this));
                                var l =
                                    'true/0' ===
                                    this.get_flag('occurs_check').indicator,
                                  u = new P(),
                                  c = A.unify(t, p.head, l);
                                null !== c &&
                                  ((u.goal = r.goal.replace(p.body)),
                                  null !== u.goal && (u.goal = u.goal.apply(c)),
                                  (u.substitution = r.substitution.apply(c)),
                                  (u.parent = r),
                                  i.push(u));
                              }
                            this.prepend(i);
                          }
                        }
                      }
                    } else
                      A.type.is_variable(r.goal)
                        ? this.throw_error(A.error.instantiation(this.level))
                        : this.throw_error(
                            A.error.type('callable', r.goal, this.level),
                          );
                    return e;
                  }
                }),
                (I.prototype.answer = function (e) {
                  return this.thread.answer(e);
                }),
                (N.prototype.answer = function (e) {
                  (e = e || function (e) {}),
                    this.__calls.push(e),
                    this.__calls.length > 1 || this.again();
                }),
                (I.prototype.answers = function (e, r, t) {
                  return this.thread.answers(e, r, t);
                }),
                (N.prototype.answers = function (e, r, t) {
                  var n = this;
                  r <= 0
                    ? t && t()
                    : this.answer(function (i) {
                        e(i),
                          !1 !== i
                            ? setTimeout(function () {
                                n.answers(e, r - 1, t);
                              }, 1)
                            : t && t();
                      });
                }),
                (I.prototype.again = function (e) {
                  return this.thread.again(e);
                }),
                (N.prototype.again = function (e) {
                  for (var r, t = Date.now(); this.__calls.length > 0; ) {
                    for (
                      this.warnings = [],
                        !1 !== e && (this.current_limit = this.session.limit);
                      this.current_limit > 0 &&
                      this.points.length > 0 &&
                      null !== this.head_point().goal &&
                      !A.type.is_error(this.head_point().goal);

                    )
                      if ((this.current_limit--, !0 === this.step())) return;
                    var n = Date.now();
                    (this.cpu_time_last = n - t),
                      (this.cpu_time += this.cpu_time_last);
                    var i = this.__calls.shift();
                    this.current_limit <= 0
                      ? i(null)
                      : 0 === this.points.length
                      ? i(!1)
                      : A.type.is_error(this.head_point().goal)
                      ? ((r = this.session.format_error(this.points.pop())),
                        (this.points = []),
                        i(r))
                      : (this.debugger &&
                          this.debugger_states.push(this.head_point()),
                        i(
                          (r = this.session.format_success(this.points.pop())),
                        ));
                  }
                }),
                (I.prototype.unfold = function (e) {
                  if (null === e.body) return !1;
                  var t = e.head,
                    n = e.body,
                    i = n.select(),
                    a = new N(this),
                    s = [];
                  a.add_goal(i), a.step();
                  for (var o = a.points.length - 1; o >= 0; o--) {
                    var p = a.points[o],
                      l = t.apply(p.substitution),
                      u = n.replace(p.goal);
                    null !== u && (u = u.apply(p.substitution)),
                      s.push(new C(l, u));
                  }
                  var c = this.rules[t.indicator],
                    y = r(c, e);
                  return (
                    s.length > 0 &&
                    -1 !== y &&
                    (c.splice.apply(c, [y, 1].concat(s)), !0)
                  );
                }),
                (N.prototype.unfold = function (e) {
                  return this.session.unfold(e);
                }),
                (x.prototype.interpret = function (e) {
                  return A.error.instantiation(e.level);
                }),
                (T.prototype.interpret = function (e) {
                  return this;
                }),
                (k.prototype.interpret = function (e) {
                  return A.type.is_unitary_list(this)
                    ? this.args[0].interpret(e)
                    : A.operate(e, this);
                }),
                (x.prototype.compare = function (e) {
                  return this.id < e.id ? -1 : this.id > e.id ? 1 : 0;
                }),
                (T.prototype.compare = function (e) {
                  return this.value === e.value && this.is_float === e.is_float
                    ? 0
                    : this.value < e.value ||
                      (this.value === e.value && this.is_float && !e.is_float)
                    ? -1
                    : this.value > e.value
                    ? 1
                    : void 0;
                }),
                (k.prototype.compare = function (e) {
                  if (
                    this.args.length < e.args.length ||
                    (this.args.length === e.args.length && this.id < e.id)
                  )
                    return -1;
                  if (
                    this.args.length > e.args.length ||
                    (this.args.length === e.args.length && this.id > e.id)
                  )
                    return 1;
                  for (var r = 0; r < this.args.length; r++) {
                    var t = A.compare(this.args[r], e.args[r]);
                    if (0 !== t) return t;
                  }
                  return 0;
                }),
                (E.prototype.lookup = function (e) {
                  return this.links[e] ? this.links[e] : null;
                }),
                (E.prototype.filter = function (e) {
                  var r = {};
                  for (var t in this.links)
                    if (this.links.hasOwnProperty(t)) {
                      var n = this.links[t];
                      e(t, n) && (r[t] = n);
                    }
                  return new E(r);
                }),
                (E.prototype.exclude = function (e) {
                  var t = {};
                  for (var n in this.links)
                    this.links.hasOwnProperty(n) &&
                      -1 === r(e, n) &&
                      (t[n] = this.links[n]);
                  return new E(t);
                }),
                (E.prototype.add = function (e, r) {
                  this.links[e] = r;
                }),
                (E.prototype.domain = function (e) {
                  var r =
                      !0 === e
                        ? function (e) {
                            return e;
                          }
                        : function (e) {
                            return new x(e);
                          },
                    t = [];
                  for (var n in this.links) t.push(r(n));
                  return t;
                }),
                (x.prototype.compile = function () {
                  return 'new pl.type.Var("' + this.id.toString() + '")';
                }),
                (T.prototype.compile = function () {
                  return (
                    'new pl.type.Num(' +
                    this.value.toString() +
                    ', ' +
                    this.is_float.toString() +
                    ')'
                  );
                }),
                (k.prototype.compile = function () {
                  return (
                    'new pl.type.Term("' +
                    this.id.replace(/"/g, '\\"') +
                    '", [' +
                    i(this.args, function (e) {
                      return e.compile();
                    }) +
                    '])'
                  );
                }),
                (C.prototype.compile = function () {
                  return (
                    'new pl.type.Rule(' +
                    this.head.compile() +
                    ', ' +
                    (null === this.body ? 'null' : this.body.compile()) +
                    ')'
                  );
                }),
                (I.prototype.compile = function () {
                  var e,
                    r,
                    t = [];
                  for (var n in this.rules)
                    if (this.rules.hasOwnProperty(n)) {
                      var i = this.rules[n];
                      (r = []), (e = '"' + n + '": [');
                      for (var a = 0; a < i.length; a++) r.push(i[a].compile());
                      (e += r.join()), (e += ']'), t.push(e);
                    }
                  return '{' + t.join() + '};';
                }),
                (x.prototype.toJavaScript = function () {}),
                (T.prototype.toJavaScript = function () {
                  return this.value;
                }),
                (k.prototype.toJavaScript = function () {
                  if (0 === this.args.length && '[]/0' !== this.indicator)
                    return this.id;
                  if (A.type.is_list(this)) {
                    for (var e, r = [], t = this; './2' === t.indicator; ) {
                      if (void 0 === (e = t.args[0].toJavaScript())) return;
                      r.push(e), (t = t.args[1]);
                    }
                    if ('[]/0' === t.indicator) return r;
                  }
                }),
                (C.prototype.singleton_variables = function () {
                  var e = this.head.variables(),
                    r = {},
                    t = [];
                  null !== this.body && (e = e.concat(this.body.variables()));
                  for (var n = 0; n < e.length; n++)
                    void 0 === r[e[n]] && (r[e[n]] = 0), r[e[n]]++;
                  for (var i in r) '_' !== i && 1 === r[i] && t.push(i);
                  return t;
                });
              var A = {
                __env: e.exports ? global : window,
                module: {},
                version: n,
                parser: { tokenizer: f, expression: d },
                utils: { str_indicator: b, codePointAt: s, fromCodePoint: o },
                statistics: {
                  getCountTerms: function () {
                    return V;
                  },
                },
                fromJavaScript: {
                  test: {
                    boolean: function (e) {
                      return !0 === e || !1 === e;
                    },
                    number: function (e) {
                      return 'number' == typeof e;
                    },
                    string: function (e) {
                      return 'string' == typeof e;
                    },
                    list: function (e) {
                      return e instanceof Array;
                    },
                    variable: function (e) {
                      return void 0 === e;
                    },
                    any: function (e) {
                      return !0;
                    },
                  },
                  conversion: {
                    boolean: function (e) {
                      return new k(e ? 'true' : 'false', []);
                    },
                    number: function (e) {
                      return new T(e, e % 1 != 0);
                    },
                    string: function (e) {
                      return new k(e, []);
                    },
                    list: function (e) {
                      for (var r, t = [], n = 0; n < e.length; n++) {
                        if (void 0 === (r = A.fromJavaScript.apply(e[n])))
                          return;
                        t.push(r);
                      }
                      return g(t);
                    },
                    variable: function (e) {
                      return new x('_');
                    },
                    any: function (e) {},
                  },
                  apply: function (e) {
                    for (var r in A.fromJavaScript.test)
                      if ('any' !== r && A.fromJavaScript.test[r](e))
                        return A.fromJavaScript.conversion[r](e);
                    return A.fromJavaScript.conversion.any(e);
                  },
                },
                type: {
                  Var: x,
                  Num: T,
                  Term: k,
                  Rule: C,
                  State: P,
                  Stream: O,
                  Module: R,
                  Thread: N,
                  Session: I,
                  Substitution: E,
                  order: [x, T, k, O],
                  compare: function (e, t) {
                    var n = r(A.type.order, e.constructor),
                      i = r(A.type.order, t.constructor);
                    if (n < i) return -1;
                    if (n > i) return 1;
                    if (e.constructor === T) {
                      if (e.is_float && t.is_float) return 0;
                      if (e.is_float) return -1;
                      if (t.is_float) return 1;
                    }
                    return 0;
                  },
                  is_substitution: function (e) {
                    return e instanceof E;
                  },
                  is_state: function (e) {
                    return e instanceof P;
                  },
                  is_rule: function (e) {
                    return e instanceof C;
                  },
                  is_variable: function (e) {
                    return e instanceof x;
                  },
                  is_stream: function (e) {
                    return e instanceof O;
                  },
                  is_anonymous_var: function (e) {
                    return e instanceof x && '_' === e.id;
                  },
                  is_callable: function (e) {
                    return e instanceof k;
                  },
                  is_number: function (e) {
                    return e instanceof T;
                  },
                  is_integer: function (e) {
                    return e instanceof T && !e.is_float;
                  },
                  is_float: function (e) {
                    return e instanceof T && e.is_float;
                  },
                  is_term: function (e) {
                    return e instanceof k;
                  },
                  is_atom: function (e) {
                    return e instanceof k && 0 === e.args.length;
                  },
                  is_ground: function (e) {
                    if (e instanceof x) return !1;
                    if (e instanceof k)
                      for (var r = 0; r < e.args.length; r++)
                        if (!A.type.is_ground(e.args[r])) return !1;
                    return !0;
                  },
                  is_atomic: function (e) {
                    return (
                      (e instanceof k && 0 === e.args.length) || e instanceof T
                    );
                  },
                  is_compound: function (e) {
                    return e instanceof k && e.args.length > 0;
                  },
                  is_list: function (e) {
                    return (
                      e instanceof k &&
                      ('[]/0' === e.indicator || './2' === e.indicator)
                    );
                  },
                  is_empty_list: function (e) {
                    return e instanceof k && '[]/0' === e.indicator;
                  },
                  is_non_empty_list: function (e) {
                    return e instanceof k && './2' === e.indicator;
                  },
                  is_fully_list: function (e) {
                    for (; e instanceof k && './2' === e.indicator; )
                      e = e.args[1];
                    return (
                      e instanceof x ||
                      (e instanceof k && '[]/0' === e.indicator)
                    );
                  },
                  is_instantiated_list: function (e) {
                    for (; e instanceof k && './2' === e.indicator; )
                      e = e.args[1];
                    return e instanceof k && '[]/0' === e.indicator;
                  },
                  is_unitary_list: function (e) {
                    return (
                      e instanceof k &&
                      './2' === e.indicator &&
                      e.args[1] instanceof k &&
                      '[]/0' === e.args[1].indicator
                    );
                  },
                  is_character: function (e) {
                    return (
                      e instanceof k &&
                      (1 === e.id.length ||
                        (e.id.length > 0 &&
                          e.id.length <= 2 &&
                          s(e.id, 0) >= 65536))
                    );
                  },
                  is_character_code: function (e) {
                    return (
                      e instanceof T &&
                      !e.is_float &&
                      e.value >= 0 &&
                      e.value <= 1114111
                    );
                  },
                  is_byte: function (e) {
                    return (
                      e instanceof T &&
                      !e.is_float &&
                      e.value >= 0 &&
                      e.value <= 255
                    );
                  },
                  is_operator: function (e) {
                    return (
                      e instanceof k && A.arithmetic.evaluation[e.indicator]
                    );
                  },
                  is_directive: function (e) {
                    return (
                      e instanceof k && void 0 !== A.directive[e.indicator]
                    );
                  },
                  is_builtin: function (e) {
                    return (
                      e instanceof k && void 0 !== A.predicate[e.indicator]
                    );
                  },
                  is_error: function (e) {
                    return e instanceof k && 'throw/1' === e.indicator;
                  },
                  is_predicate_indicator: function (e) {
                    return (
                      e instanceof k &&
                      '//2' === e.indicator &&
                      e.args[0] instanceof k &&
                      0 === e.args[0].args.length &&
                      e.args[1] instanceof T &&
                      !1 === e.args[1].is_float
                    );
                  },
                  is_flag: function (e) {
                    return (
                      e instanceof k &&
                      0 === e.args.length &&
                      void 0 !== A.flag[e.id]
                    );
                  },
                  is_value_flag: function (e, r) {
                    if (!A.type.is_flag(e)) return !1;
                    for (var t in A.flag[e.id].allowed)
                      if (
                        A.flag[e.id].allowed.hasOwnProperty(t) &&
                        A.flag[e.id].allowed[t].equals(r)
                      )
                        return !0;
                    return !1;
                  },
                  is_io_mode: function (e) {
                    return (
                      A.type.is_atom(e) &&
                      -1 !== ['read', 'write', 'append'].indexOf(e.id)
                    );
                  },
                  is_stream_option: function (e) {
                    return (
                      A.type.is_term(e) &&
                      (('alias/1' === e.indicator &&
                        A.type.is_atom(e.args[0])) ||
                        ('reposition/1' === e.indicator &&
                          A.type.is_atom(e.args[0]) &&
                          ('true' === e.args[0].id ||
                            'false' === e.args[0].id)) ||
                        ('type/1' === e.indicator &&
                          A.type.is_atom(e.args[0]) &&
                          ('text' === e.args[0].id ||
                            'binary' === e.args[0].id)) ||
                        ('eof_action/1' === e.indicator &&
                          A.type.is_atom(e.args[0]) &&
                          ('error' === e.args[0].id ||
                            'eof_code' === e.args[0].id ||
                            'reset' === e.args[0].id)))
                    );
                  },
                  is_stream_position: function (e) {
                    return (
                      (A.type.is_integer(e) && e.value >= 0) ||
                      (A.type.is_atom(e) &&
                        ('end_of_stream' === e.id ||
                          'past_end_of_stream' === e.id))
                    );
                  },
                  is_stream_property: function (e) {
                    return (
                      A.type.is_term(e) &&
                      ('input/0' === e.indicator ||
                        'output/0' === e.indicator ||
                        ('alias/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            A.type.is_atom(e.args[0]))) ||
                        ('file_name/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            A.type.is_atom(e.args[0]))) ||
                        ('position/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            A.type.is_stream_position(e.args[0]))) ||
                        ('reposition/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            (A.type.is_atom(e.args[0]) &&
                              ('true' === e.args[0].id ||
                                'false' === e.args[0].id)))) ||
                        ('type/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            (A.type.is_atom(e.args[0]) &&
                              ('text' === e.args[0].id ||
                                'binary' === e.args[0].id)))) ||
                        ('mode/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            (A.type.is_atom(e.args[0]) &&
                              ('read' === e.args[0].id ||
                                'write' === e.args[0].id ||
                                'append' === e.args[0].id)))) ||
                        ('eof_action/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            (A.type.is_atom(e.args[0]) &&
                              ('error' === e.args[0].id ||
                                'eof_code' === e.args[0].id ||
                                'reset' === e.args[0].id)))) ||
                        ('end_of_stream/1' === e.indicator &&
                          (A.type.is_variable(e.args[0]) ||
                            (A.type.is_atom(e.args[0]) &&
                              ('at' === e.args[0].id ||
                                'past' === e.args[0].id ||
                                'not' === e.args[0].id)))))
                    );
                  },
                  is_streamable: function (e) {
                    return void 0 !== e.__proto__.stream;
                  },
                  is_read_option: function (e) {
                    return (
                      A.type.is_term(e) &&
                      -1 !==
                        [
                          'variables/1',
                          'variable_names/1',
                          'singletons/1',
                        ].indexOf(e.indicator)
                    );
                  },
                  is_write_option: function (e) {
                    return (
                      A.type.is_term(e) &&
                      (('quoted/1' === e.indicator &&
                        A.type.is_atom(e.args[0]) &&
                        ('true' === e.args[0].id ||
                          'false' === e.args[0].id)) ||
                        ('ignore_ops/1' === e.indicator &&
                          A.type.is_atom(e.args[0]) &&
                          ('true' === e.args[0].id ||
                            'false' === e.args[0].id)) ||
                        ('numbervars/1' === e.indicator &&
                          A.type.is_atom(e.args[0]) &&
                          ('true' === e.args[0].id ||
                            'false' === e.args[0].id)))
                    );
                  },
                  is_close_option: function (e) {
                    return (
                      A.type.is_term(e) &&
                      'force/1' === e.indicator &&
                      A.type.is_atom(e.args[0]) &&
                      ('true' === e.args[0].id || 'false' === e.args[0].id)
                    );
                  },
                  is_modifiable_flag: function (e) {
                    return A.type.is_flag(e) && A.flag[e.id].changeable;
                  },
                  is_module: function (e) {
                    return (
                      e instanceof k &&
                      'library/1' === e.indicator &&
                      e.args[0] instanceof k &&
                      0 === e.args[0].args.length &&
                      void 0 !== A.module[e.args[0].id]
                    );
                  },
                },
                arithmetic: {
                  evaluation: {
                    'e/0': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e) {
                        return Math.E;
                      },
                    },
                    'pi/0': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e) {
                        return Math.PI;
                      },
                    },
                    'tau/0': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e) {
                        return 2 * Math.PI;
                      },
                    },
                    'epsilon/0': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e) {
                        return Number.EPSILON;
                      },
                    },
                    '+/1': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r) {
                        return e;
                      },
                    },
                    '-/1': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r) {
                        return -e;
                      },
                    },
                    '\\/1': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r) {
                        return ~e;
                      },
                    },
                    'abs/1': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r) {
                        return Math.abs(e);
                      },
                    },
                    'sign/1': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r) {
                        return Math.sign(e);
                      },
                    },
                    'float_integer_part/1': {
                      type_args: !0,
                      type_result: !1,
                      fn: function (e, r) {
                        return parseInt(e);
                      },
                    },
                    'float_fractional_part/1': {
                      type_args: !0,
                      type_result: !0,
                      fn: function (e, r) {
                        return e - parseInt(e);
                      },
                    },
                    'float/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return parseFloat(e);
                      },
                    },
                    'floor/1': {
                      type_args: !0,
                      type_result: !1,
                      fn: function (e, r) {
                        return Math.floor(e);
                      },
                    },
                    'truncate/1': {
                      type_args: !0,
                      type_result: !1,
                      fn: function (e, r) {
                        return parseInt(e);
                      },
                    },
                    'round/1': {
                      type_args: !0,
                      type_result: !1,
                      fn: function (e, r) {
                        return Math.round(e);
                      },
                    },
                    'ceiling/1': {
                      type_args: !0,
                      type_result: !1,
                      fn: function (e, r) {
                        return Math.ceil(e);
                      },
                    },
                    'sin/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.sin(e);
                      },
                    },
                    'cos/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.cos(e);
                      },
                    },
                    'tan/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.tan(e);
                      },
                    },
                    'asin/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.asin(e);
                      },
                    },
                    'acos/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.acos(e);
                      },
                    },
                    'atan/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.atan(e);
                      },
                    },
                    'atan2/2': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r, t) {
                        return Math.atan2(e, r);
                      },
                    },
                    'exp/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.exp(e);
                      },
                    },
                    'sqrt/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return Math.sqrt(e);
                      },
                    },
                    'log/1': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r) {
                        return e > 0
                          ? Math.log(e)
                          : A.error.evaluation('undefined', r.__call_indicator);
                      },
                    },
                    '+/2': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r, t) {
                        return e + r;
                      },
                    },
                    '-/2': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r, t) {
                        return e - r;
                      },
                    },
                    '*/2': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r, t) {
                        return e * r;
                      },
                    },
                    '//2': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r, t) {
                        return r
                          ? e / r
                          : A.error.evaluation(
                              'zero_division',
                              t.__call_indicator,
                            );
                      },
                    },
                    '///2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return r
                          ? parseInt(e / r)
                          : A.error.evaluation(
                              'zero_division',
                              t.__call_indicator,
                            );
                      },
                    },
                    '**/2': {
                      type_args: null,
                      type_result: !0,
                      fn: function (e, r, t) {
                        return Math.pow(e, r);
                      },
                    },
                    '^/2': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r, t) {
                        return Math.pow(e, r);
                      },
                    },
                    '<</2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return e << r;
                      },
                    },
                    '>>/2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return e >> r;
                      },
                    },
                    '/\\/2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return e & r;
                      },
                    },
                    '\\//2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return e | r;
                      },
                    },
                    'xor/2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return e ^ r;
                      },
                    },
                    'rem/2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return r
                          ? e % r
                          : A.error.evaluation(
                              'zero_division',
                              t.__call_indicator,
                            );
                      },
                    },
                    'mod/2': {
                      type_args: !1,
                      type_result: !1,
                      fn: function (e, r, t) {
                        return r
                          ? e - parseInt(e / r) * r
                          : A.error.evaluation(
                              'zero_division',
                              t.__call_indicator,
                            );
                      },
                    },
                    'max/2': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r, t) {
                        return Math.max(e, r);
                      },
                    },
                    'min/2': {
                      type_args: null,
                      type_result: null,
                      fn: function (e, r, t) {
                        return Math.min(e, r);
                      },
                    },
                  },
                },
                directive: {
                  'dynamic/1': function (e, r) {
                    var t = r.args[0];
                    if (A.type.is_variable(t))
                      e.throw_error(A.error.instantiation(r.indicator));
                    else if (A.type.is_compound(t) && '//2' === t.indicator)
                      if (
                        A.type.is_variable(t.args[0]) ||
                        A.type.is_variable(t.args[1])
                      )
                        e.throw_error(A.error.instantiation(r.indicator));
                      else if (A.type.is_atom(t.args[0]))
                        if (A.type.is_integer(t.args[1])) {
                          var n =
                            r.args[0].args[0].id +
                            '/' +
                            r.args[0].args[1].value;
                          (e.session.public_predicates[n] = !0),
                            e.session.rules[n] || (e.session.rules[n] = []);
                        } else
                          e.throw_error(
                            A.error.type('integer', t.args[1], r.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.type('atom', t.args[0], r.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.type('predicate_indicator', t, r.indicator),
                      );
                  },
                  'multifile/1': function (e, r) {
                    var t = r.args[0];
                    A.type.is_variable(t)
                      ? e.throw_error(A.error.instantiation(r.indicator))
                      : A.type.is_compound(t) && '//2' === t.indicator
                      ? A.type.is_variable(t.args[0]) ||
                        A.type.is_variable(t.args[1])
                        ? e.throw_error(A.error.instantiation(r.indicator))
                        : A.type.is_atom(t.args[0])
                        ? A.type.is_integer(t.args[1])
                          ? (e.session.multifile_predicates[
                              r.args[0].args[0].id +
                                '/' +
                                r.args[0].args[1].value
                            ] = !0)
                          : e.throw_error(
                              A.error.type('integer', t.args[1], r.indicator),
                            )
                        : e.throw_error(
                            A.error.type('atom', t.args[0], r.indicator),
                          )
                      : e.throw_error(
                          A.error.type('predicate_indicator', t, r.indicator),
                        );
                  },
                  'set_prolog_flag/2': function (e, r) {
                    var t = r.args[0],
                      n = r.args[1];
                    A.type.is_variable(t) || A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(r.indicator))
                      : A.type.is_atom(t)
                      ? A.type.is_flag(t)
                        ? A.type.is_value_flag(t, n)
                          ? A.type.is_modifiable_flag(t)
                            ? (e.session.flag[t.id] = n)
                            : e.throw_error(
                                A.error.permission('modify', 'flag', t),
                              )
                          : e.throw_error(
                              A.error.domain(
                                'flag_value',
                                new k('+', [t, n]),
                                r.indicator,
                              ),
                            )
                        : e.throw_error(
                            A.error.domain('prolog_flag', t, r.indicator),
                          )
                      : e.throw_error(A.error.type('atom', t, r.indicator));
                  },
                  'use_module/1': function (e, t) {
                    var n = t.args[0];
                    if (A.type.is_variable(n))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_term(n)) {
                      if (A.type.is_module(n)) {
                        var i = n.args[0].id;
                        -1 === r(e.session.modules, i) &&
                          e.session.modules.push(i);
                      }
                    } else e.throw_error(A.error.type('term', n, t.indicator));
                  },
                  'char_conversion/2': function (e, r) {
                    var t = r.args[0],
                      n = r.args[1];
                    A.type.is_variable(t) || A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(r.indicator))
                      : A.type.is_character(t)
                      ? A.type.is_character(n)
                        ? t.id === n.id
                          ? delete e.session.__char_conversion[t.id]
                          : (e.session.__char_conversion[t.id] = n.id)
                        : e.throw_error(
                            A.error.type('character', n, r.indicator),
                          )
                      : e.throw_error(
                          A.error.type('character', t, r.indicator),
                        );
                  },
                  'op/3': function (e, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2];
                    if (
                      A.type.is_variable(n) ||
                      A.type.is_variable(i) ||
                      A.type.is_variable(a)
                    )
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_integer(n))
                      if (A.type.is_atom(i))
                        if (A.type.is_atom(a))
                          if (n.value < 0 || n.value > 1200)
                            e.throw_error(
                              A.error.domain(
                                'operator_priority',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (',' === a.id)
                            e.throw_error(
                              A.error.permission(
                                'modify',
                                'operator',
                                a,
                                t.indicator,
                              ),
                            );
                          else if (
                            '|' === a.id &&
                            (n.value < 1001 || 3 !== i.id.length)
                          )
                            e.throw_error(
                              A.error.permission(
                                'modify',
                                'operator',
                                a,
                                t.indicator,
                              ),
                            );
                          else if (
                            -1 ===
                            [
                              'fy',
                              'fx',
                              'yf',
                              'xf',
                              'xfx',
                              'yfx',
                              'xfy',
                            ].indexOf(i.id)
                          )
                            e.throw_error(
                              A.error.domain(
                                'operator_specifier',
                                i,
                                t.indicator,
                              ),
                            );
                          else {
                            var s,
                              o = { prefix: null, infix: null, postfix: null };
                            for (var p in e.session.__operators)
                              if (e.session.__operators.hasOwnProperty(p)) {
                                var l = e.session.__operators[p][a.id];
                                l &&
                                  (-1 !== r(l, 'fx') &&
                                    (o.prefix = { priority: p, type: 'fx' }),
                                  -1 !== r(l, 'fy') &&
                                    (o.prefix = { priority: p, type: 'fy' }),
                                  -1 !== r(l, 'xf') &&
                                    (o.postfix = { priority: p, type: 'xf' }),
                                  -1 !== r(l, 'yf') &&
                                    (o.postfix = { priority: p, type: 'yf' }),
                                  -1 !== r(l, 'xfx') &&
                                    (o.infix = { priority: p, type: 'xfx' }),
                                  -1 !== r(l, 'xfy') &&
                                    (o.infix = { priority: p, type: 'xfy' }),
                                  -1 !== r(l, 'yfx') &&
                                    (o.infix = { priority: p, type: 'yfx' }));
                              }
                            switch (i.id) {
                              case 'fy':
                              case 'fx':
                                s = 'prefix';
                                break;
                              case 'yf':
                              case 'xf':
                                s = 'postfix';
                                break;
                              default:
                                s = 'infix';
                            }
                            if (
                              !(
                                (((o.prefix && 'prefix' === s) ||
                                  (o.postfix && 'postfix' === s) ||
                                  (o.infix && 'infix' === s)) &&
                                  o[s].type !== i.id) ||
                                (o.infix && 'postfix' === s) ||
                                (o.postfix && 'infix' === s)
                              ) ||
                              0 === n.value
                            )
                              return (
                                o[s] &&
                                  (!(function (e, r) {
                                    for (var t = e.length - 1; t >= 0; t--)
                                      e[t] === r && e.splice(t, 1);
                                  })(
                                    e.session.__operators[o[s].priority][a.id],
                                    i.id,
                                  ),
                                  0 ===
                                    e.session.__operators[o[s].priority][a.id]
                                      .length &&
                                    delete e.session.__operators[o[s].priority][
                                      a.id
                                    ]),
                                n.value > 0 &&
                                  (e.session.__operators[n.value] ||
                                    (e.session.__operators[
                                      n.value.toString()
                                    ] = {}),
                                  e.session.__operators[n.value][a.id] ||
                                    (e.session.__operators[n.value][a.id] = []),
                                  e.session.__operators[n.value][a.id].push(
                                    i.id,
                                  )),
                                !0
                              );
                            e.throw_error(
                              A.error.permission(
                                'create',
                                'operator',
                                a,
                                t.indicator,
                              ),
                            );
                          }
                        else
                          e.throw_error(A.error.type('atom', a, t.indicator));
                      else e.throw_error(A.error.type('atom', i, t.indicator));
                    else e.throw_error(A.error.type('integer', n, t.indicator));
                  },
                },
                predicate: {
                  'op/3': function (e, r, t) {
                    A.directive['op/3'](e, t) && e.success(r);
                  },
                  'current_op/3': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2],
                      s = [];
                    for (var o in e.session.__operators)
                      for (var p in e.session.__operators[o])
                        for (
                          var l = 0;
                          l < e.session.__operators[o][p].length;
                          l++
                        )
                          s.push(
                            new P(
                              r.goal.replace(
                                new k(',', [
                                  new k('=', [new T(o, !1), n]),
                                  new k(',', [
                                    new k('=', [
                                      new k(e.session.__operators[o][p][l], []),
                                      i,
                                    ]),
                                    new k('=', [new k(p, []), a]),
                                  ]),
                                ]),
                              ),
                              r.substitution,
                              r,
                            ),
                          );
                    e.prepend(s);
                  },
                  ';/2': function (e, r, t) {
                    if (
                      A.type.is_term(t.args[0]) &&
                      '->/2' === t.args[0].indicator
                    ) {
                      var n = e.points,
                        i = e.session.format_success,
                        a = e.session.format_error;
                      (e.session.format_success = function (e) {
                        return e.substitution;
                      }),
                        (e.session.format_error = function (e) {
                          return e.goal;
                        }),
                        (e.points = [
                          new P(t.args[0].args[0], r.substitution, r),
                        ]);
                      e.__calls.unshift(function (s) {
                        (e.points = n),
                          (e.session.format_success = i),
                          (e.session.format_error = a),
                          !1 === s
                            ? e.prepend([
                                new P(
                                  r.goal.replace(t.args[1]),
                                  r.substitution,
                                  r,
                                ),
                              ])
                            : A.type.is_error(s)
                            ? e.throw_error(s.args[0])
                            : null === s
                            ? (e.prepend([r]), e.__calls.shift()(null))
                            : e.prepend([
                                new P(
                                  r.goal.replace(t.args[0].args[1]).apply(s),
                                  r.substitution.apply(s),
                                  r,
                                ),
                              ]);
                      });
                    } else {
                      var s = new P(
                          r.goal.replace(t.args[0]),
                          r.substitution,
                          r,
                        ),
                        o = new P(r.goal.replace(t.args[1]), r.substitution, r);
                      e.prepend([s, o]);
                    }
                  },
                  '!/0': function (e, r, t) {
                    var n,
                      i,
                      a = [];
                    for (
                      n = r, i = null;
                      null !== n.parent && n.parent.goal.search(t);

                    )
                      if (((i = n), null !== (n = n.parent).goal)) {
                        var s = n.goal.select();
                        if (s && 'call' === s.id && s.search(t)) {
                          n = i;
                          break;
                        }
                      }
                    for (var o = e.points.length - 1; o >= 0; o--) {
                      for (
                        var p = e.points[o], l = p.parent;
                        null !== l && l !== n.parent;

                      )
                        l = l.parent;
                      null === l && l !== n.parent && a.push(p);
                    }
                    (e.points = a.reverse()), e.success(r);
                  },
                  '\\+/1': function (e, r, t) {
                    var n = t.args[0];
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(e.level))
                      : A.type.is_callable(n)
                      ? e.prepend([
                          new P(
                            r.goal.replace(
                              new k(',', [
                                new k(',', [
                                  new k('call', [n]),
                                  new k('!', []),
                                ]),
                                new k('fail', []),
                              ]),
                            ),
                            r.substitution,
                            r,
                          ),
                          new P(r.goal.replace(null), r.substitution, r),
                        ])
                      : e.throw_error(A.error.type('callable', n, e.level));
                  },
                  '->/2': function (e, r, t) {
                    var n = r.goal.replace(
                      new k(',', [
                        t.args[0],
                        new k(',', [new k('!'), t.args[1]]),
                      ]),
                    );
                    e.prepend([new P(n, r.substitution, r)]);
                  },
                  'fail/0': function (e, r, t) {},
                  'false/0': function (e, r, t) {},
                  'true/0': function (e, r, t) {
                    e.success(r);
                  },
                  'call/1': v(1),
                  'call/2': v(2),
                  'call/3': v(3),
                  'call/4': v(4),
                  'call/5': v(5),
                  'call/6': v(6),
                  'call/7': v(7),
                  'call/8': v(8),
                  'once/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [new k('call', [n]), new k('!', [])]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'forall/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k('\\+', [
                            new k(',', [
                              new k('call', [n]),
                              new k('\\+', [new k('call', [i])]),
                            ]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'repeat/0': function (e, r, t) {
                    e.prepend([
                      new P(r.goal.replace(null), r.substitution, r),
                      r,
                    ]);
                  },
                  'throw/1': function (e, r, t) {
                    A.type.is_variable(t.args[0])
                      ? e.throw_error(A.error.instantiation(e.level))
                      : e.throw_error(t.args[0]);
                  },
                  'catch/3': function (e, r, t) {
                    var n = e.points;
                    (e.points = []),
                      e.prepend([new P(t.args[0], r.substitution, r)]);
                    var a = e.session.format_success,
                      s = e.session.format_error;
                    (e.session.format_success = function (e) {
                      return e.substitution;
                    }),
                      (e.session.format_error = function (e) {
                        return e.goal;
                      });
                    e.__calls.unshift(function (o) {
                      var p = e.points;
                      if (
                        ((e.points = n),
                        (e.session.format_success = a),
                        (e.session.format_error = s),
                        A.type.is_error(o))
                      ) {
                        for (var l = [], u = e.points.length - 1; u >= 0; u--) {
                          for (
                            var c = (_ = e.points[u]).parent;
                            null !== c && c !== r.parent;

                          )
                            c = c.parent;
                          null === c && c !== r.parent && l.push(_);
                        }
                        e.points = l;
                        var y =
                            'true/0' === e.get_flag('occurs_check').indicator,
                          _ = new P(),
                          f = A.unify(o.args[0], t.args[1], y);
                        null !== f
                          ? ((_.substitution = r.substitution.apply(f)),
                            (_.goal = r.goal.replace(t.args[2]).apply(f)),
                            (_.parent = r),
                            e.prepend([_]))
                          : e.throw_error(o.args[0]);
                      } else if (!1 !== o) {
                        var d =
                            null === o
                              ? []
                              : [
                                  new P(
                                    r.goal.apply(o).replace(null),
                                    r.substitution.apply(o),
                                    r,
                                  ),
                                ],
                          w = [];
                        for (u = p.length - 1; u >= 0; u--) {
                          w.push(p[u]);
                          var h =
                            null !== p[u].goal ? p[u].goal.select() : null;
                          if (A.type.is_term(h) && '!/0' === h.indicator) break;
                        }
                        var g = i(w, function (e) {
                          return (
                            null === e.goal && (e.goal = new k('true', [])),
                            ((e = new P(
                              r.goal.replace(
                                new k('catch', [e.goal, t.args[1], t.args[2]]),
                              ),
                              r.substitution.apply(e.substitution),
                              e.parent,
                            )).exclude = t.args[0].variables()),
                            e
                          );
                        }).reverse();
                        e.prepend(g),
                          e.prepend(d),
                          null === o &&
                            ((this.current_limit = 0), e.__calls.shift()(null));
                      }
                    });
                  },
                  '=/2': function (e, r, t) {
                    var n = 'true/0' === e.get_flag('occurs_check').indicator,
                      i = new P(),
                      a = A.unify(t.args[0], t.args[1], n);
                    null !== a &&
                      ((i.goal = r.goal.apply(a).replace(null)),
                      (i.substitution = r.substitution.apply(a)),
                      (i.parent = r),
                      e.prepend([i]));
                  },
                  'unify_with_occurs_check/2': function (e, r, t) {
                    var n = new P(),
                      i = A.unify(t.args[0], t.args[1], !0);
                    null !== i &&
                      ((n.goal = r.goal.apply(i).replace(null)),
                      (n.substitution = r.substitution.apply(i)),
                      (n.parent = r),
                      e.prepend([n]));
                  },
                  '\\=/2': function (e, r, t) {
                    var n = 'true/0' === e.get_flag('occurs_check').indicator;
                    null === A.unify(t.args[0], t.args[1], n) && e.success(r);
                  },
                  'subsumes_term/2': function (e, r, t) {
                    var n = 'true/0' === e.get_flag('occurs_check').indicator,
                      i = A.unify(t.args[1], t.args[0], n);
                    null !== i &&
                      t.args[1].apply(i).equals(t.args[1]) &&
                      e.success(r);
                  },
                  'findall/3': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2];
                    if (A.type.is_variable(i))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_callable(i))
                      if (A.type.is_variable(a) || A.type.is_list(a)) {
                        var s = e.next_free_variable(),
                          o = new k(',', [i, new k('=', [s, n])]),
                          p = e.points,
                          l = e.session.limit,
                          u = e.session.format_success;
                        (e.session.format_success = function (e) {
                          return e.substitution;
                        }),
                          e.add_goal(o, !0, r);
                        var c = [],
                          y = function (t) {
                            if (!1 === t || null === t || A.type.is_error(t)) {
                              if (
                                ((e.points = p),
                                (e.session.limit = l),
                                (e.session.format_success = u),
                                A.type.is_error(t))
                              )
                                e.throw_error(t.args[0]);
                              else if (e.current_limit > 0) {
                                for (
                                  var n = new k('[]'), i = c.length - 1;
                                  i >= 0;
                                  i--
                                )
                                  n = new k('.', [c[i], n]);
                                e.prepend([
                                  new P(
                                    r.goal.replace(new k('=', [a, n])),
                                    r.substitution,
                                    r,
                                  ),
                                ]);
                              }
                            } else
                              e.__calls.unshift(y),
                                c.push(t.links[s.id]),
                                (e.session.limit = e.current_limit);
                          };
                        e.__calls.unshift(y);
                      } else
                        e.throw_error(A.error.type('list', a, t.indicator));
                    else
                      e.throw_error(A.error.type('callable', i, t.indicator));
                  },
                  'bagof/3': function (e, t, n) {
                    var i = n.args[0],
                      a = n.args[1],
                      s = n.args[2];
                    if (A.type.is_variable(a))
                      e.throw_error(A.error.instantiation(n.indicator));
                    else if (A.type.is_callable(a))
                      if (A.type.is_variable(s) || A.type.is_list(s)) {
                        var o,
                          p = e.next_free_variable();
                        '^/2' === a.indicator
                          ? ((o = a.args[0].variables()), (a = a.args[1]))
                          : (o = []),
                          (o = o.concat(i.variables()));
                        for (
                          var l = a.variables().filter(function (e) {
                              return -1 === r(o, e);
                            }),
                            u = new k('[]'),
                            c = l.length - 1;
                          c >= 0;
                          c--
                        )
                          u = new k('.', [new x(l[c]), u]);
                        var y = new k(',', [
                            a,
                            new k('=', [p, new k(',', [u, i])]),
                          ]),
                          _ = e.points,
                          f = e.session.limit,
                          d = e.session.format_success;
                        (e.session.format_success = function (e) {
                          return e.substitution;
                        }),
                          e.add_goal(y, !0, t);
                        var w = [],
                          h = function (r) {
                            if (!1 === r || null === r || A.type.is_error(r)) {
                              if (
                                ((e.points = _),
                                (e.session.limit = f),
                                (e.session.format_success = d),
                                A.type.is_error(r))
                              )
                                e.throw_error(r.args[0]);
                              else if (e.current_limit > 0) {
                                for (var n = [], i = 0; i < w.length; i++) {
                                  r = w[i].answers;
                                  for (
                                    var a = new k('[]'), o = r.length - 1;
                                    o >= 0;
                                    o--
                                  )
                                    a = new k('.', [r[o], a]);
                                  n.push(
                                    new P(
                                      t.goal.replace(
                                        new k(',', [
                                          new k('=', [u, w[i].variables]),
                                          new k('=', [s, a]),
                                        ]),
                                      ),
                                      t.substitution,
                                      t,
                                    ),
                                  );
                                }
                                e.prepend(n);
                              }
                            } else {
                              e.__calls.unshift(h);
                              var l = !1,
                                c = r.links[p.id].args[0],
                                y = r.links[p.id].args[1];
                              for (var g in w)
                                if (w.hasOwnProperty(g)) {
                                  var m = w[g];
                                  if (m.variables.equals(c)) {
                                    m.answers.push(y), (l = !0);
                                    break;
                                  }
                                }
                              l || w.push({ variables: c, answers: [y] }),
                                (e.session.limit = e.current_limit);
                            }
                          };
                        e.__calls.unshift(h);
                      } else
                        e.throw_error(A.error.type('list', s, n.indicator));
                    else
                      e.throw_error(A.error.type('callable', a, n.indicator));
                  },
                  'setof/3': function (e, t, n) {
                    var i = n.args[0],
                      a = n.args[1],
                      s = n.args[2];
                    if (A.type.is_variable(a))
                      e.throw_error(A.error.instantiation(n.indicator));
                    else if (A.type.is_callable(a))
                      if (A.type.is_variable(s) || A.type.is_list(s)) {
                        var o,
                          p = e.next_free_variable();
                        '^/2' === a.indicator
                          ? ((o = a.args[0].variables()), (a = a.args[1]))
                          : (o = []),
                          (o = o.concat(i.variables()));
                        for (
                          var l = a.variables().filter(function (e) {
                              return -1 === r(o, e);
                            }),
                            u = new k('[]'),
                            c = l.length - 1;
                          c >= 0;
                          c--
                        )
                          u = new k('.', [new x(l[c]), u]);
                        var y = new k(',', [
                            a,
                            new k('=', [p, new k(',', [u, i])]),
                          ]),
                          _ = e.points,
                          f = e.session.limit,
                          d = e.session.format_success;
                        (e.session.format_success = function (e) {
                          return e.substitution;
                        }),
                          e.add_goal(y, !0, t);
                        var w = [],
                          h = function (r) {
                            if (!1 === r || null === r || A.type.is_error(r)) {
                              if (
                                ((e.points = _),
                                (e.session.limit = f),
                                (e.session.format_success = d),
                                A.type.is_error(r))
                              )
                                e.throw_error(r.args[0]);
                              else if (e.current_limit > 0) {
                                for (var n = [], i = 0; i < w.length; i++) {
                                  r = w[i].answers.sort(A.compare);
                                  for (
                                    var a = new k('[]'), o = r.length - 1;
                                    o >= 0;
                                    o--
                                  )
                                    a = new k('.', [r[o], a]);
                                  n.push(
                                    new P(
                                      t.goal.replace(
                                        new k(',', [
                                          new k('=', [u, w[i].variables]),
                                          new k('=', [s, a]),
                                        ]),
                                      ),
                                      t.substitution,
                                      t,
                                    ),
                                  );
                                }
                                e.prepend(n);
                              }
                            } else {
                              e.__calls.unshift(h);
                              var l = !1,
                                c = r.links[p.id].args[0],
                                y = r.links[p.id].args[1];
                              for (var g in w)
                                if (w.hasOwnProperty(g)) {
                                  var m = w[g];
                                  if (m.variables.equals(c)) {
                                    m.answers.push(y), (l = !0);
                                    break;
                                  }
                                }
                              l || w.push({ variables: c, answers: [y] }),
                                (e.session.limit = e.current_limit);
                            }
                          };
                        e.__calls.unshift(h);
                      } else
                        e.throw_error(A.error.type('list', s, n.indicator));
                    else
                      e.throw_error(A.error.type('callable', a, n.indicator));
                  },
                  'functor/3': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2];
                    if (
                      A.type.is_variable(n) &&
                      (A.type.is_variable(i) || A.type.is_variable(a))
                    )
                      e.throw_error(A.error.instantiation('functor/3'));
                    else if (A.type.is_variable(a) || A.type.is_integer(a))
                      if (A.type.is_variable(i) || A.type.is_atomic(i))
                        if (
                          A.type.is_integer(i) &&
                          A.type.is_integer(a) &&
                          0 !== a.value
                        )
                          e.throw_error(
                            A.error.type('atom', t.args[1], 'functor/3'),
                          );
                        else if (A.type.is_variable(n)) {
                          if (t.args[2].value >= 0) {
                            for (var s = [], o = 0; o < a.value; o++)
                              s.push(e.next_free_variable());
                            var p = A.type.is_integer(i) ? i : new k(i.id, s);
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [n, p])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        } else {
                          var l = A.type.is_integer(n) ? n : new k(n.id, []),
                            u = A.type.is_integer(n)
                              ? new T(0, !1)
                              : new T(n.args.length, !1),
                            c = new k(',', [
                              new k('=', [l, i]),
                              new k('=', [u, a]),
                            ]);
                          e.prepend([
                            new P(r.goal.replace(c), r.substitution, r),
                          ]);
                        }
                      else
                        e.throw_error(
                          A.error.type('atomic', t.args[1], 'functor/3'),
                        );
                    else
                      e.throw_error(
                        A.error.type('integer', t.args[2], 'functor/3'),
                      );
                  },
                  'arg/3': function (e, r, t) {
                    if (
                      A.type.is_variable(t.args[0]) ||
                      A.type.is_variable(t.args[1])
                    )
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (t.args[0].value < 0)
                      e.throw_error(
                        A.error.domain(
                          'not_less_than_zero',
                          t.args[0],
                          t.indicator,
                        ),
                      );
                    else if (A.type.is_compound(t.args[1])) {
                      var n = t.args[0].value;
                      if (n > 0 && n <= t.args[1].args.length) {
                        var i = new k('=', [t.args[1].args[n - 1], t.args[2]]);
                        e.prepend([
                          new P(r.goal.replace(i), r.substitution, r),
                        ]);
                      }
                    } else
                      e.throw_error(
                        A.error.type('compound', t.args[1], t.indicator),
                      );
                  },
                  '=../2': function (e, r, t) {
                    var n;
                    if (
                      A.type.is_variable(t.args[0]) &&
                      (A.type.is_variable(t.args[1]) ||
                        (A.type.is_non_empty_list(t.args[1]) &&
                          A.type.is_variable(t.args[1].args[0])))
                    )
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_fully_list(t.args[1]))
                      if (A.type.is_variable(t.args[0])) {
                        if (!A.type.is_variable(t.args[1])) {
                          var i = [];
                          for (n = t.args[1].args[1]; './2' === n.indicator; )
                            i.push(n.args[0]), (n = n.args[1]);
                          A.type.is_variable(t.args[0]) && A.type.is_variable(n)
                            ? e.throw_error(A.error.instantiation(t.indicator))
                            : 0 === i.length &&
                              A.type.is_compound(t.args[1].args[0])
                            ? e.throw_error(
                                A.error.type(
                                  'atomic',
                                  t.args[1].args[0],
                                  t.indicator,
                                ),
                              )
                            : i.length > 0 &&
                              (A.type.is_compound(t.args[1].args[0]) ||
                                A.type.is_number(t.args[1].args[0]))
                            ? e.throw_error(
                                A.error.type(
                                  'atom',
                                  t.args[1].args[0],
                                  t.indicator,
                                ),
                              )
                            : 0 === i.length
                            ? e.prepend([
                                new P(
                                  r.goal.replace(
                                    new k(
                                      '=',
                                      [t.args[1].args[0], t.args[0]],
                                      r,
                                    ),
                                  ),
                                  r.substitution,
                                  r,
                                ),
                              ])
                            : e.prepend([
                                new P(
                                  r.goal.replace(
                                    new k('=', [
                                      new k(t.args[1].args[0].id, i),
                                      t.args[0],
                                    ]),
                                  ),
                                  r.substitution,
                                  r,
                                ),
                              ]);
                        }
                      } else {
                        if (A.type.is_atomic(t.args[0]))
                          n = new k('.', [t.args[0], new k('[]')]);
                        else {
                          n = new k('[]');
                          for (var a = t.args[0].args.length - 1; a >= 0; a--)
                            n = new k('.', [t.args[0].args[a], n]);
                          n = new k('.', [new k(t.args[0].id), n]);
                        }
                        e.prepend([
                          new P(
                            r.goal.replace(new k('=', [n, t.args[1]])),
                            r.substitution,
                            r,
                          ),
                        ]);
                      }
                    else
                      e.throw_error(
                        A.error.type('list', t.args[1], t.indicator),
                      );
                  },
                  'copy_term/2': function (e, r, t) {
                    var n = t.args[0].rename(e);
                    e.prepend([
                      new P(
                        r.goal.replace(new k('=', [n, t.args[1]])),
                        r.substitution,
                        r.parent,
                      ),
                    ]);
                  },
                  'term_variables/2': function (e, r, t) {
                    var n = t.args[0],
                      a = t.args[1];
                    if (A.type.is_fully_list(a)) {
                      var s = g(
                        i(m(n.variables()), function (e) {
                          return new x(e);
                        }),
                      );
                      e.prepend([
                        new P(
                          r.goal.replace(new k('=', [a, s])),
                          r.substitution,
                          r,
                        ),
                      ]);
                    } else e.throw_error(A.error.type('list', a, t.indicator));
                  },
                  'clause/2': function (e, r, t) {
                    if (A.type.is_variable(t.args[0]))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_callable(t.args[0]))
                      if (
                        A.type.is_variable(t.args[1]) ||
                        A.type.is_callable(t.args[1])
                      ) {
                        if (void 0 !== e.session.rules[t.args[0].indicator])
                          if (e.is_public_predicate(t.args[0].indicator)) {
                            var n = [];
                            for (var i in e.session.rules[t.args[0].indicator])
                              if (
                                e.session.rules[
                                  t.args[0].indicator
                                ].hasOwnProperty(i)
                              ) {
                                var a = e.session.rules[t.args[0].indicator][i];
                                (e.session.renamed_variables = {}),
                                  null === (a = a.rename(e)).body &&
                                    (a.body = new k('true'));
                                var s = new k(',', [
                                  new k('=', [a.head, t.args[0]]),
                                  new k('=', [a.body, t.args[1]]),
                                ]);
                                n.push(
                                  new P(r.goal.replace(s), r.substitution, r),
                                );
                              }
                            e.prepend(n);
                          } else
                            e.throw_error(
                              A.error.permission(
                                'access',
                                'private_procedure',
                                t.args[0].indicator,
                                t.indicator,
                              ),
                            );
                      } else
                        e.throw_error(
                          A.error.type('callable', t.args[1], t.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.type('callable', t.args[0], t.indicator),
                      );
                  },
                  'current_predicate/1': function (e, r, t) {
                    var n = t.args[0];
                    if (
                      A.type.is_variable(n) ||
                      (A.type.is_compound(n) && '//2' === n.indicator)
                    )
                      if (
                        A.type.is_variable(n) ||
                        A.type.is_variable(n.args[0]) ||
                        A.type.is_atom(n.args[0])
                      )
                        if (
                          A.type.is_variable(n) ||
                          A.type.is_variable(n.args[1]) ||
                          A.type.is_integer(n.args[1])
                        ) {
                          var i = [];
                          for (var a in e.session.rules)
                            if (e.session.rules.hasOwnProperty(a)) {
                              var s = a.lastIndexOf('/'),
                                o = a.substr(0, s),
                                p = parseInt(
                                  a.substr(s + 1, a.length - (s + 1)),
                                ),
                                l = new k('/', [new k(o), new T(p, !1)]),
                                u = new k('=', [l, n]);
                              i.push(
                                new P(r.goal.replace(u), r.substitution, r),
                              );
                            }
                          e.prepend(i);
                        } else
                          e.throw_error(
                            A.error.type('integer', n.args[1], t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.type('atom', n.args[0], t.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.type('predicate_indicator', n, t.indicator),
                      );
                  },
                  'asserta/1': function (e, r, t) {
                    if (A.type.is_variable(t.args[0]))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_callable(t.args[0])) {
                      var n, i;
                      ':-/2' === t.args[0].indicator
                        ? ((n = t.args[0].args[0]), (i = h(t.args[0].args[1])))
                        : ((n = t.args[0]), (i = null)),
                        A.type.is_callable(n)
                          ? null === i || A.type.is_callable(i)
                            ? e.is_public_predicate(n.indicator)
                              ? (void 0 === e.session.rules[n.indicator] &&
                                  (e.session.rules[n.indicator] = []),
                                (e.session.public_predicates[n.indicator] = !0),
                                (e.session.rules[n.indicator] = [
                                  new C(n, i, !0),
                                ].concat(e.session.rules[n.indicator])),
                                e.success(r))
                              : e.throw_error(
                                  A.error.permission(
                                    'modify',
                                    'static_procedure',
                                    n.indicator,
                                    t.indicator,
                                  ),
                                )
                            : e.throw_error(
                                A.error.type('callable', i, t.indicator),
                              )
                          : e.throw_error(
                              A.error.type('callable', n, t.indicator),
                            );
                    } else
                      e.throw_error(
                        A.error.type('callable', t.args[0], t.indicator),
                      );
                  },
                  'assertz/1': function (e, r, t) {
                    if (A.type.is_variable(t.args[0]))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_callable(t.args[0])) {
                      var n, i;
                      ':-/2' === t.args[0].indicator
                        ? ((n = t.args[0].args[0]), (i = h(t.args[0].args[1])))
                        : ((n = t.args[0]), (i = null)),
                        A.type.is_callable(n)
                          ? null === i || A.type.is_callable(i)
                            ? e.is_public_predicate(n.indicator)
                              ? (void 0 === e.session.rules[n.indicator] &&
                                  (e.session.rules[n.indicator] = []),
                                (e.session.public_predicates[n.indicator] = !0),
                                e.session.rules[n.indicator].push(
                                  new C(n, i, !0),
                                ),
                                e.success(r))
                              : e.throw_error(
                                  A.error.permission(
                                    'modify',
                                    'static_procedure',
                                    n.indicator,
                                    t.indicator,
                                  ),
                                )
                            : e.throw_error(
                                A.error.type('callable', i, t.indicator),
                              )
                          : e.throw_error(
                              A.error.type('callable', n, t.indicator),
                            );
                    } else
                      e.throw_error(
                        A.error.type('callable', t.args[0], t.indicator),
                      );
                  },
                  'retract/1': function (e, r, t) {
                    if (A.type.is_variable(t.args[0]))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_callable(t.args[0])) {
                      var n, i;
                      if (
                        (':-/2' === t.args[0].indicator
                          ? ((n = t.args[0].args[0]), (i = t.args[0].args[1]))
                          : ((n = t.args[0]), (i = new k('true'))),
                        void 0 === r.retract)
                      )
                        if (e.is_public_predicate(n.indicator)) {
                          if (void 0 !== e.session.rules[n.indicator]) {
                            for (
                              var a = [], s = 0;
                              s < e.session.rules[n.indicator].length;
                              s++
                            ) {
                              e.session.renamed_variables = {};
                              var o = e.session.rules[n.indicator][s],
                                p = o.rename(e);
                              null === p.body && (p.body = new k('true', []));
                              var l =
                                'true/0' ===
                                e.get_flag('occurs_check').indicator;
                              if (
                                null !==
                                A.unify(
                                  new k(',', [n, i]),
                                  new k(',', [p.head, p.body]),
                                  l,
                                )
                              ) {
                                var u = new P(
                                  r.goal.replace(
                                    new k(',', [
                                      new k('retract', [new k(':-', [n, i])]),
                                      new k(',', [
                                        new k('=', [n, p.head]),
                                        new k('=', [i, p.body]),
                                      ]),
                                    ]),
                                  ),
                                  r.substitution,
                                  r,
                                );
                                (u.retract = o), a.push(u);
                              }
                            }
                            e.prepend(a);
                          }
                        } else
                          e.throw_error(
                            A.error.permission(
                              'modify',
                              'static_procedure',
                              n.indicator,
                              t.indicator,
                            ),
                          );
                      else
                        !(function (e, r, t, n) {
                          if (null !== e.session.rules[t])
                            for (var i = 0; i < e.session.rules[t].length; i++)
                              if (e.session.rules[t][i] === n) {
                                e.session.rules[t].splice(i, 1), e.success(r);
                                break;
                              }
                        })(e, r, n.indicator, r.retract);
                    } else
                      e.throw_error(
                        A.error.type('callable', t.args[0], t.indicator),
                      );
                  },
                  'retractall/1': function (e, r, t) {
                    var n = t.args[0];
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_callable(n)
                      ? e.prepend([
                          new P(
                            r.goal.replace(
                              new k(',', [
                                new k('retract', [
                                  new A.type.Term(':-', [n, new x('_')]),
                                ]),
                                new k('fail', []),
                              ]),
                            ),
                            r.substitution,
                            r,
                          ),
                          new P(r.goal.replace(null), r.substitution, r),
                        ])
                      : e.throw_error(A.error.type('callable', n, t.indicator));
                  },
                  'abolish/1': function (e, r, t) {
                    if (
                      A.type.is_variable(t.args[0]) ||
                      (A.type.is_term(t.args[0]) &&
                        '//2' === t.args[0].indicator &&
                        (A.type.is_variable(t.args[0].args[0]) ||
                          A.type.is_variable(t.args[0].args[1])))
                    )
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (
                      A.type.is_term(t.args[0]) &&
                      '//2' === t.args[0].indicator
                    )
                      if (A.type.is_atom(t.args[0].args[0]))
                        if (A.type.is_integer(t.args[0].args[1]))
                          if (t.args[0].args[1].value < 0)
                            e.throw_error(
                              A.error.domain(
                                'not_less_than_zero',
                                t.args[0].args[1],
                                t.indicator,
                              ),
                            );
                          else if (
                            A.type.is_number(e.get_flag('max_arity')) &&
                            t.args[0].args[1].value >
                              e.get_flag('max_arity').value
                          )
                            e.throw_error(
                              A.error.representation('max_arity', t.indicator),
                            );
                          else {
                            var n =
                              t.args[0].args[0].id +
                              '/' +
                              t.args[0].args[1].value;
                            e.is_public_predicate(n)
                              ? (delete e.session.rules[n], e.success(r))
                              : e.throw_error(
                                  A.error.permission(
                                    'modify',
                                    'static_procedure',
                                    n,
                                    t.indicator,
                                  ),
                                );
                          }
                        else
                          e.throw_error(
                            A.error.type(
                              'integer',
                              t.args[0].args[1],
                              t.indicator,
                            ),
                          );
                      else
                        e.throw_error(
                          A.error.type('atom', t.args[0].args[0], t.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.type(
                          'predicate_indicator',
                          t.args[0],
                          t.indicator,
                        ),
                      );
                  },
                  'atom_length/2': function (e, r, t) {
                    if (A.type.is_variable(t.args[0]))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_atom(t.args[0]))
                      if (
                        A.type.is_variable(t.args[1]) ||
                        A.type.is_integer(t.args[1])
                      )
                        if (A.type.is_integer(t.args[1]) && t.args[1].value < 0)
                          e.throw_error(
                            A.error.domain(
                              'not_less_than_zero',
                              t.args[1],
                              t.indicator,
                            ),
                          );
                        else {
                          var n = new T(t.args[0].id.length, !1);
                          e.prepend([
                            new P(
                              r.goal.replace(new k('=', [n, t.args[1]])),
                              r.substitution,
                              r,
                            ),
                          ]);
                        }
                      else
                        e.throw_error(
                          A.error.type('integer', t.args[1], t.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.type('atom', t.args[0], t.indicator),
                      );
                  },
                  'atom_concat/3': function (e, r, t) {
                    var n,
                      i,
                      a = t.args[0],
                      s = t.args[1],
                      o = t.args[2];
                    if (
                      A.type.is_variable(o) &&
                      (A.type.is_variable(a) || A.type.is_variable(s))
                    )
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(a) || A.type.is_atom(a))
                      if (A.type.is_variable(s) || A.type.is_atom(s))
                        if (A.type.is_variable(o) || A.type.is_atom(o)) {
                          var p = A.type.is_variable(a),
                            l = A.type.is_variable(s);
                          if (p || l)
                            if (p && !l)
                              (n = o.id.substr(0, o.id.length - s.id.length)) +
                                s.id ===
                                o.id &&
                                ((i = new k('=', [a, new k(n)])),
                                e.prepend([
                                  new P(r.goal.replace(i), r.substitution, r),
                                ]));
                            else if (l && !p)
                              (n = o.id.substr(a.id.length)),
                                a.id + n === o.id &&
                                  ((i = new k('=', [s, new k(n)])),
                                  e.prepend([
                                    new P(r.goal.replace(i), r.substitution, r),
                                  ]));
                            else {
                              for (var u = [], c = 0; c <= o.id.length; c++) {
                                var y = new k(o.id.substr(0, c)),
                                  _ = new k(o.id.substr(c));
                                (i = new k(',', [
                                  new k('=', [y, a]),
                                  new k('=', [_, s]),
                                ])),
                                  u.push(
                                    new P(r.goal.replace(i), r.substitution, r),
                                  );
                              }
                              e.prepend(u);
                            }
                          else
                            (i = new k('=', [o, new k(a.id + s.id)])),
                              e.prepend([
                                new P(r.goal.replace(i), r.substitution, r),
                              ]);
                        } else
                          e.throw_error(A.error.type('atom', o, t.indicator));
                      else e.throw_error(A.error.type('atom', s, t.indicator));
                    else e.throw_error(A.error.type('atom', a, t.indicator));
                  },
                  'sub_atom/5': function (e, t, n) {
                    var i,
                      a = n.args[0],
                      s = n.args[1],
                      o = n.args[2],
                      p = n.args[3],
                      l = n.args[4];
                    if (A.type.is_variable(a))
                      e.throw_error(A.error.instantiation(n.indicator));
                    else if (A.type.is_variable(s) || A.type.is_integer(s))
                      if (A.type.is_variable(o) || A.type.is_integer(o))
                        if (A.type.is_variable(p) || A.type.is_integer(p))
                          if (A.type.is_integer(s) && s.value < 0)
                            e.throw_error(
                              A.error.domain(
                                'not_less_than_zero',
                                s,
                                n.indicator,
                              ),
                            );
                          else if (A.type.is_integer(o) && o.value < 0)
                            e.throw_error(
                              A.error.domain(
                                'not_less_than_zero',
                                o,
                                n.indicator,
                              ),
                            );
                          else if (A.type.is_integer(p) && p.value < 0)
                            e.throw_error(
                              A.error.domain(
                                'not_less_than_zero',
                                p,
                                n.indicator,
                              ),
                            );
                          else {
                            var u = [],
                              c = [],
                              y = [];
                            if (A.type.is_variable(s))
                              for (i = 0; i <= a.id.length; i++) u.push(i);
                            else u.push(s.value);
                            if (A.type.is_variable(o))
                              for (i = 0; i <= a.id.length; i++) c.push(i);
                            else c.push(o.value);
                            if (A.type.is_variable(p))
                              for (i = 0; i <= a.id.length; i++) y.push(i);
                            else y.push(p.value);
                            var _ = [];
                            for (var f in u)
                              if (u.hasOwnProperty(f))
                                for (var d in ((i = u[f]), c))
                                  if (c.hasOwnProperty(d)) {
                                    var w = c[d],
                                      h = a.id.length - i - w;
                                    if (
                                      -1 !== r(y, h) &&
                                      i + w + h === a.id.length
                                    ) {
                                      var g = a.id.substr(i, w);
                                      if (
                                        a.id ===
                                        a.id.substr(0, i) +
                                          g +
                                          a.id.substr(i + w, h)
                                      ) {
                                        var m = new k('=', [new k(g), l]),
                                          v = new k('=', [s, new T(i)]),
                                          b = new k('=', [o, new T(w)]),
                                          x = new k('=', [p, new T(h)]),
                                          V = new k(',', [
                                            new k(',', [new k(',', [v, b]), x]),
                                            m,
                                          ]);
                                        _.push(
                                          new P(
                                            t.goal.replace(V),
                                            t.substitution,
                                            t,
                                          ),
                                        );
                                      }
                                    }
                                  }
                            e.prepend(_);
                          }
                        else
                          e.throw_error(
                            A.error.type('integer', p, n.indicator),
                          );
                      else
                        e.throw_error(A.error.type('integer', o, n.indicator));
                    else e.throw_error(A.error.type('integer', s, n.indicator));
                  },
                  'atom_chars/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    if (A.type.is_variable(n) && A.type.is_variable(i))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(n) || A.type.is_atom(n))
                      if (A.type.is_variable(n)) {
                        for (
                          var a = i, s = A.type.is_variable(n), o = '';
                          './2' === a.indicator;

                        ) {
                          if (A.type.is_character(a.args[0])) o += a.args[0].id;
                          else {
                            if (A.type.is_variable(a.args[0]) && s)
                              return void e.throw_error(
                                A.error.instantiation(t.indicator),
                              );
                            if (!A.type.is_variable(a.args[0]))
                              return void e.throw_error(
                                A.error.type(
                                  'character',
                                  a.args[0],
                                  t.indicator,
                                ),
                              );
                          }
                          a = a.args[1];
                        }
                        A.type.is_variable(a) && s
                          ? e.throw_error(A.error.instantiation(t.indicator))
                          : A.type.is_empty_list(a) || A.type.is_variable(a)
                          ? e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new k(o), n])),
                                r.substitution,
                                r,
                              ),
                            ])
                          : e.throw_error(A.error.type('list', i, t.indicator));
                      } else {
                        for (
                          var p = new k('[]'), l = n.id.length - 1;
                          l >= 0;
                          l--
                        )
                          p = new k('.', [new k(n.id.charAt(l)), p]);
                        e.prepend([
                          new P(
                            r.goal.replace(new k('=', [i, p])),
                            r.substitution,
                            r,
                          ),
                        ]);
                      }
                    else e.throw_error(A.error.type('atom', n, t.indicator));
                  },
                  'atom_codes/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    if (A.type.is_variable(n) && A.type.is_variable(i))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(n) || A.type.is_atom(n))
                      if (A.type.is_variable(n)) {
                        for (
                          var a = i, p = A.type.is_variable(n), l = '';
                          './2' === a.indicator;

                        ) {
                          if (A.type.is_character_code(a.args[0]))
                            l += o(a.args[0].value);
                          else {
                            if (A.type.is_variable(a.args[0]) && p)
                              return void e.throw_error(
                                A.error.instantiation(t.indicator),
                              );
                            if (!A.type.is_variable(a.args[0]))
                              return void e.throw_error(
                                A.error.representation(
                                  'character_code',
                                  t.indicator,
                                ),
                              );
                          }
                          a = a.args[1];
                        }
                        A.type.is_variable(a) && p
                          ? e.throw_error(A.error.instantiation(t.indicator))
                          : A.type.is_empty_list(a) || A.type.is_variable(a)
                          ? e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new k(l), n])),
                                r.substitution,
                                r,
                              ),
                            ])
                          : e.throw_error(A.error.type('list', i, t.indicator));
                      } else {
                        for (
                          var u = new k('[]'), c = n.id.length - 1;
                          c >= 0;
                          c--
                        )
                          u = new k('.', [new T(s(n.id, c), !1), u]);
                        e.prepend([
                          new P(
                            r.goal.replace(new k('=', [i, u])),
                            r.substitution,
                            r,
                          ),
                        ]);
                      }
                    else e.throw_error(A.error.type('atom', n, t.indicator));
                  },
                  'char_code/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    if (A.type.is_variable(n) && A.type.is_variable(i))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(n) || A.type.is_character(n))
                      if (A.type.is_variable(i) || A.type.is_integer(i))
                        if (
                          A.type.is_variable(i) ||
                          A.type.is_character_code(i)
                        )
                          if (A.type.is_variable(i)) {
                            var a = new T(s(n.id, 0), !1);
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [a, i])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          } else {
                            var p = new k(o(i.value));
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [p, n])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        else
                          e.throw_error(
                            A.error.representation(
                              'character_code',
                              t.indicator,
                            ),
                          );
                      else
                        e.throw_error(A.error.type('integer', i, t.indicator));
                    else
                      e.throw_error(A.error.type('character', n, t.indicator));
                  },
                  'number_chars/2': function (e, r, t) {
                    var n,
                      i = t.args[0],
                      a = t.args[1];
                    if (A.type.is_variable(i) && A.type.is_variable(a))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_number(i))
                      if (A.type.is_variable(a) || A.type.is_list(a)) {
                        var s = A.type.is_variable(i);
                        if (!A.type.is_variable(a)) {
                          var o = a,
                            p = !0;
                          for (n = ''; './2' === o.indicator; ) {
                            if (A.type.is_character(o.args[0]))
                              n += o.args[0].id;
                            else if (A.type.is_variable(o.args[0])) p = !1;
                            else if (!A.type.is_variable(o.args[0]))
                              return void e.throw_error(
                                A.error.type(
                                  'character',
                                  o.args[0],
                                  t.indicator,
                                ),
                              );
                            o = o.args[1];
                          }
                          if (
                            ((p = p && A.type.is_empty_list(o)),
                            !A.type.is_empty_list(o) && !A.type.is_variable(o))
                          )
                            return void e.throw_error(
                              A.error.type('list', a, t.indicator),
                            );
                          if (!p && s)
                            return void e.throw_error(
                              A.error.instantiation(t.indicator),
                            );
                          if (p) {
                            if (A.type.is_variable(o) && s)
                              return void e.throw_error(
                                A.error.instantiation(t.indicator),
                              );
                            var l = e.parse(n),
                              u = l.value;
                            return void (!A.type.is_number(u) ||
                            l.tokens[l.tokens.length - 1].space
                              ? e.throw_error(
                                  A.error.syntax_by_predicate(
                                    'parseable_number',
                                    t.indicator,
                                  ),
                                )
                              : e.prepend([
                                  new P(
                                    r.goal.replace(new k('=', [i, u])),
                                    r.substitution,
                                    r,
                                  ),
                                ]));
                          }
                        }
                        if (!s) {
                          n = i.toString();
                          for (
                            var c = new k('[]'), y = n.length - 1;
                            y >= 0;
                            y--
                          )
                            c = new k('.', [new k(n.charAt(y)), c]);
                          e.prepend([
                            new P(
                              r.goal.replace(new k('=', [a, c])),
                              r.substitution,
                              r,
                            ),
                          ]);
                        }
                      } else
                        e.throw_error(A.error.type('list', a, t.indicator));
                    else e.throw_error(A.error.type('number', i, t.indicator));
                  },
                  'number_codes/2': function (e, r, t) {
                    var n,
                      i = t.args[0],
                      a = t.args[1];
                    if (A.type.is_variable(i) && A.type.is_variable(a))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_number(i))
                      if (A.type.is_variable(a) || A.type.is_list(a)) {
                        var p = A.type.is_variable(i);
                        if (!A.type.is_variable(a)) {
                          var l = a,
                            u = !0;
                          for (n = ''; './2' === l.indicator; ) {
                            if (A.type.is_character_code(l.args[0]))
                              n += o(l.args[0].value);
                            else if (A.type.is_variable(l.args[0])) u = !1;
                            else if (!A.type.is_variable(l.args[0]))
                              return void e.throw_error(
                                A.error.type(
                                  'character_code',
                                  l.args[0],
                                  t.indicator,
                                ),
                              );
                            l = l.args[1];
                          }
                          if (
                            ((u = u && A.type.is_empty_list(l)),
                            !A.type.is_empty_list(l) && !A.type.is_variable(l))
                          )
                            return void e.throw_error(
                              A.error.type('list', a, t.indicator),
                            );
                          if (!u && p)
                            return void e.throw_error(
                              A.error.instantiation(t.indicator),
                            );
                          if (u) {
                            if (A.type.is_variable(l) && p)
                              return void e.throw_error(
                                A.error.instantiation(t.indicator),
                              );
                            var c = e.parse(n),
                              y = c.value;
                            return void (!A.type.is_number(y) ||
                            c.tokens[c.tokens.length - 1].space
                              ? e.throw_error(
                                  A.error.syntax_by_predicate(
                                    'parseable_number',
                                    t.indicator,
                                  ),
                                )
                              : e.prepend([
                                  new P(
                                    r.goal.replace(new k('=', [i, y])),
                                    r.substitution,
                                    r,
                                  ),
                                ]));
                          }
                        }
                        if (!p) {
                          n = i.toString();
                          for (
                            var _ = new k('[]'), f = n.length - 1;
                            f >= 0;
                            f--
                          )
                            _ = new k('.', [new T(s(n, f), !1), _]);
                          e.prepend([
                            new P(
                              r.goal.replace(new k('=', [a, _])),
                              r.substitution,
                              r,
                            ),
                          ]);
                        }
                      } else
                        e.throw_error(A.error.type('list', a, t.indicator));
                    else e.throw_error(A.error.type('number', i, t.indicator));
                  },
                  'upcase_atom/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_atom(n)
                      ? A.type.is_variable(i) || A.type.is_atom(i)
                        ? e.prepend([
                            new P(
                              r.goal.replace(
                                new k('=', [i, new k(n.id.toUpperCase(), [])]),
                              ),
                              r.substitution,
                              r,
                            ),
                          ])
                        : e.throw_error(A.error.type('atom', i, t.indicator))
                      : e.throw_error(A.error.type('atom', n, t.indicator));
                  },
                  'downcase_atom/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_atom(n)
                      ? A.type.is_variable(i) || A.type.is_atom(i)
                        ? e.prepend([
                            new P(
                              r.goal.replace(
                                new k('=', [i, new k(n.id.toLowerCase(), [])]),
                              ),
                              r.substitution,
                              r,
                            ),
                          ])
                        : e.throw_error(A.error.type('atom', i, t.indicator))
                      : e.throw_error(A.error.type('atom', n, t.indicator));
                  },
                  'atomic_list_concat/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k('atomic_list_concat', [n, new k('', []), i]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'atomic_list_concat/3': function (e, r, t) {
                    var n = t.args[0],
                      a = t.args[1],
                      s = t.args[2];
                    if (
                      A.type.is_variable(a) ||
                      (A.type.is_variable(n) && A.type.is_variable(s))
                    )
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(n) || A.type.is_list(n))
                      if (A.type.is_variable(s) || A.type.is_atom(s))
                        if (A.type.is_variable(s)) {
                          for (
                            var o = '', p = n;
                            A.type.is_term(p) && './2' === p.indicator;

                          ) {
                            if (
                              !A.type.is_atom(p.args[0]) &&
                              !A.type.is_number(p.args[0])
                            )
                              return void e.throw_error(
                                A.error.type('atomic', p.args[0], t.indicator),
                              );
                            '' !== o && (o += a.id),
                              A.type.is_atom(p.args[0])
                                ? (o += p.args[0].id)
                                : (o += '' + p.args[0].value),
                              (p = p.args[1]);
                          }
                          (o = new k(o, [])),
                            A.type.is_variable(p)
                              ? e.throw_error(
                                  A.error.instantiation(t.indicator),
                                )
                              : A.type.is_term(p) && '[]/0' === p.indicator
                              ? e.prepend([
                                  new P(
                                    r.goal.replace(new k('=', [o, s])),
                                    r.substitution,
                                    r,
                                  ),
                                ])
                              : e.throw_error(
                                  A.error.type('list', n, t.indicator),
                                );
                        } else {
                          var l = g(
                            i(s.id.split(a.id), function (e) {
                              return new k(e, []);
                            }),
                          );
                          e.prepend([
                            new P(
                              r.goal.replace(new k('=', [l, n])),
                              r.substitution,
                              r,
                            ),
                          ]);
                        }
                      else e.throw_error(A.error.type('atom', s, t.indicator));
                    else e.throw_error(A.error.type('list', n, t.indicator));
                  },
                  '@=</2': function (e, r, t) {
                    A.compare(t.args[0], t.args[1]) <= 0 && e.success(r);
                  },
                  '==/2': function (e, r, t) {
                    0 === A.compare(t.args[0], t.args[1]) && e.success(r);
                  },
                  '\\==/2': function (e, r, t) {
                    0 !== A.compare(t.args[0], t.args[1]) && e.success(r);
                  },
                  '@</2': function (e, r, t) {
                    A.compare(t.args[0], t.args[1]) < 0 && e.success(r);
                  },
                  '@>/2': function (e, r, t) {
                    A.compare(t.args[0], t.args[1]) > 0 && e.success(r);
                  },
                  '@>=/2': function (e, r, t) {
                    A.compare(t.args[0], t.args[1]) >= 0 && e.success(r);
                  },
                  'compare/3': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2];
                    if (A.type.is_variable(n) || A.type.is_atom(n))
                      if (
                        A.type.is_atom(n) &&
                        -1 === ['<', '>', '='].indexOf(n.id)
                      )
                        e.throw_error(A.type.domain('order', n, t.indicator));
                      else {
                        var s = A.compare(i, a);
                        (s = 0 === s ? '=' : -1 === s ? '<' : '>'),
                          e.prepend([
                            new P(
                              r.goal.replace(new k('=', [n, new k(s, [])])),
                              r.substitution,
                              r,
                            ),
                          ]);
                      }
                    else e.throw_error(A.error.type('atom', n, t.indicator));
                  },
                  'is/2': function (e, r, t) {
                    var n = t.args[1].interpret(e);
                    A.type.is_number(n)
                      ? e.prepend([
                          new P(
                            r.goal.replace(new k('=', [t.args[0], n], e.level)),
                            r.substitution,
                            r,
                          ),
                        ])
                      : e.throw_error(n);
                  },
                  'between/3': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2];
                    if (A.type.is_variable(n) || A.type.is_variable(i))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_integer(n))
                      if (A.type.is_integer(i))
                        if (A.type.is_variable(a) || A.type.is_integer(a))
                          if (A.type.is_variable(a)) {
                            var s = [
                              new P(
                                r.goal.replace(new k('=', [a, n])),
                                r.substitution,
                                r,
                              ),
                            ];
                            n.value < i.value &&
                              s.push(
                                new P(
                                  r.goal.replace(
                                    new k('between', [
                                      new T(n.value + 1, !1),
                                      i,
                                      a,
                                    ]),
                                  ),
                                  r.substitution,
                                  r,
                                ),
                              ),
                              e.prepend(s);
                          } else
                            n.value <= a.value &&
                              i.value >= a.value &&
                              e.success(r);
                        else
                          e.throw_error(
                            A.error.type('integer', a, t.indicator),
                          );
                      else
                        e.throw_error(A.error.type('integer', i, t.indicator));
                    else e.throw_error(A.error.type('integer', n, t.indicator));
                  },
                  'succ/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    A.type.is_variable(n) && A.type.is_variable(i)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_variable(n) || A.type.is_integer(n)
                      ? A.type.is_variable(i) || A.type.is_integer(i)
                        ? !A.type.is_variable(n) && n.value < 0
                          ? e.throw_error(
                              A.error.domain(
                                'not_less_than_zero',
                                n,
                                t.indicator,
                              ),
                            )
                          : !A.type.is_variable(i) && i.value < 0
                          ? e.throw_error(
                              A.error.domain(
                                'not_less_than_zero',
                                i,
                                t.indicator,
                              ),
                            )
                          : (A.type.is_variable(i) || i.value > 0) &&
                            (A.type.is_variable(n)
                              ? e.prepend([
                                  new P(
                                    r.goal.replace(
                                      new k('=', [n, new T(i.value - 1, !1)]),
                                    ),
                                    r.substitution,
                                    r,
                                  ),
                                ])
                              : e.prepend([
                                  new P(
                                    r.goal.replace(
                                      new k('=', [i, new T(n.value + 1, !1)]),
                                    ),
                                    r.substitution,
                                    r,
                                  ),
                                ]))
                        : e.throw_error(A.error.type('integer', i, t.indicator))
                      : e.throw_error(A.error.type('integer', n, t.indicator));
                  },
                  '=:=/2': function (e, r, t) {
                    var n = A.arithmetic_compare(e, t.args[0], t.args[1]);
                    A.type.is_term(n)
                      ? e.throw_error(n)
                      : 0 === n && e.success(r);
                  },
                  '=\\=/2': function (e, r, t) {
                    var n = A.arithmetic_compare(e, t.args[0], t.args[1]);
                    A.type.is_term(n)
                      ? e.throw_error(n)
                      : 0 !== n && e.success(r);
                  },
                  '</2': function (e, r, t) {
                    var n = A.arithmetic_compare(e, t.args[0], t.args[1]);
                    A.type.is_term(n)
                      ? e.throw_error(n)
                      : n < 0 && e.success(r);
                  },
                  '=</2': function (e, r, t) {
                    var n = A.arithmetic_compare(e, t.args[0], t.args[1]);
                    A.type.is_term(n)
                      ? e.throw_error(n)
                      : n <= 0 && e.success(r);
                  },
                  '>/2': function (e, r, t) {
                    var n = A.arithmetic_compare(e, t.args[0], t.args[1]);
                    A.type.is_term(n)
                      ? e.throw_error(n)
                      : n > 0 && e.success(r);
                  },
                  '>=/2': function (e, r, t) {
                    var n = A.arithmetic_compare(e, t.args[0], t.args[1]);
                    A.type.is_term(n)
                      ? e.throw_error(n)
                      : n >= 0 && e.success(r);
                  },
                  'var/1': function (e, r, t) {
                    A.type.is_variable(t.args[0]) && e.success(r);
                  },
                  'atom/1': function (e, r, t) {
                    A.type.is_atom(t.args[0]) && e.success(r);
                  },
                  'atomic/1': function (e, r, t) {
                    A.type.is_atomic(t.args[0]) && e.success(r);
                  },
                  'compound/1': function (e, r, t) {
                    A.type.is_compound(t.args[0]) && e.success(r);
                  },
                  'integer/1': function (e, r, t) {
                    A.type.is_integer(t.args[0]) && e.success(r);
                  },
                  'float/1': function (e, r, t) {
                    A.type.is_float(t.args[0]) && e.success(r);
                  },
                  'number/1': function (e, r, t) {
                    A.type.is_number(t.args[0]) && e.success(r);
                  },
                  'nonvar/1': function (e, r, t) {
                    A.type.is_variable(t.args[0]) || e.success(r);
                  },
                  'ground/1': function (e, r, t) {
                    0 === t.variables().length && e.success(r);
                  },
                  'acyclic_term/1': function (e, r, t) {
                    for (
                      var n = r.substitution.apply(r.substitution),
                        i = t.args[0].variables(),
                        a = 0;
                      a < i.length;
                      a++
                    )
                      if (
                        void 0 !== r.substitution.links[i[a]] &&
                        !r.substitution.links[i[a]].equals(n.links[i[a]])
                      )
                        return;
                    e.success(r);
                  },
                  'callable/1': function (e, r, t) {
                    A.type.is_callable(t.args[0]) && e.success(r);
                  },
                  'is_list/1': function (e, r, t) {
                    for (
                      var n = t.args[0];
                      A.type.is_term(n) && './2' === n.indicator;

                    )
                      n = n.args[1];
                    A.type.is_term(n) && '[]/0' === n.indicator && e.success(r);
                  },
                  'current_input/1': function (e, r, t) {
                    var n = t.args[0];
                    A.type.is_variable(n) ||
                    A.type.is_stream(n) ||
                    A.type.is_atom(n)
                      ? (A.type.is_atom(n) &&
                          e.get_stream_by_alias(n.id) &&
                          (n = e.get_stream_by_alias(n.id)),
                        e.prepend([
                          new P(
                            r.goal.replace(
                              new k('=', [n, e.get_current_input()]),
                            ),
                            r.substitution,
                            r,
                          ),
                        ]))
                      : e.throw_error(A.error.domain('stream', n, t.indicator));
                  },
                  'current_output/1': function (e, r, t) {
                    var n = t.args[0];
                    A.type.is_variable(n) ||
                    A.type.is_stream(n) ||
                    A.type.is_atom(n)
                      ? (A.type.is_atom(n) &&
                          e.get_stream_by_alias(n.id) &&
                          (n = e.get_stream_by_alias(n.id)),
                        e.prepend([
                          new P(
                            r.goal.replace(
                              new k('=', [n, e.get_current_output()]),
                            ),
                            r.substitution,
                            r,
                          ),
                        ]))
                      : e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                  },
                  'set_input/1': function (e, r, t) {
                    var n = t.args[0],
                      i = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_variable(n) ||
                        A.type.is_stream(n) ||
                        A.type.is_atom(n)
                      ? A.type.is_stream(i)
                        ? !0 === i.output
                          ? e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            )
                          : (e.set_current_input(i), e.success(r))
                        : e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          )
                      : e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                  },
                  'set_output/1': function (e, r, t) {
                    var n = t.args[0],
                      i = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_variable(n) ||
                        A.type.is_stream(n) ||
                        A.type.is_atom(n)
                      ? A.type.is_stream(i)
                        ? !0 === i.input
                          ? e.throw_error(
                              A.error.permission(
                                'output',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            )
                          : (e.set_current_output(i), e.success(r))
                        : e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          )
                      : e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                  },
                  'open/3': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k('open', [n, i, a, new k('[]', [])]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'open/4': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2],
                      s = t.args[3];
                    if (A.type.is_variable(n) || A.type.is_variable(i))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_atom(i))
                      if (A.type.is_list(s))
                        if (A.type.is_variable(a))
                          if (A.type.is_atom(n) || A.type.is_streamable(n))
                            if (A.type.is_io_mode(i)) {
                              for (
                                var o, p = {}, l = s;
                                A.type.is_term(l) && './2' === l.indicator;

                              ) {
                                if (((o = l.args[0]), A.type.is_variable(o)))
                                  return void e.throw_error(
                                    A.error.instantiation(t.indicator),
                                  );
                                if (!A.type.is_stream_option(o))
                                  return void e.throw_error(
                                    A.error.domain(
                                      'stream_option',
                                      o,
                                      t.indicator,
                                    ),
                                  );
                                (p[o.id] = o.args[0].id), (l = l.args[1]);
                              }
                              if ('[]/0' !== l.indicator)
                                return void (A.type.is_variable(l)
                                  ? e.throw_error(
                                      A.error.instantiation(t.indicator),
                                    )
                                  : e.throw_error(
                                      A.error.type('list', s, t.indicator),
                                    ));
                              var u,
                                c = p.alias;
                              if (c && e.get_stream_by_alias(c))
                                return void e.throw_error(
                                  A.error.permission(
                                    'open',
                                    'source_sink',
                                    new k('alias', [new k(c, [])]),
                                    t.indicator,
                                  ),
                                );
                              if (
                                (p.type || (p.type = 'text'),
                                !1 ===
                                  (u = A.type.is_atom(n)
                                    ? e.file_system_open(n.id, p.type, i.id)
                                    : n.stream(p.type, i.id)))
                              )
                                return void e.throw_error(
                                  A.error.permission(
                                    'open',
                                    'source_sink',
                                    n,
                                    t.indicator,
                                  ),
                                );
                              if (null === u)
                                return void e.throw_error(
                                  A.error.existence(
                                    'source_sink',
                                    n,
                                    t.indicator,
                                  ),
                                );
                              var y = new O(
                                u,
                                i.id,
                                p.alias,
                                p.type,
                                'true' === p.reposition,
                                p.eof_action,
                              );
                              c
                                ? (e.session.streams[c] = y)
                                : (e.session.streams[y.id] = y),
                                e.prepend([
                                  new P(
                                    r.goal.replace(new k('=', [a, y])),
                                    r.substitution,
                                    r,
                                  ),
                                ]);
                            } else
                              e.throw_error(
                                A.error.domain('io_mode', i, t.indicator),
                              );
                          else
                            e.throw_error(
                              A.error.domain('source_sink', n, t.indicator),
                            );
                        else
                          e.throw_error(
                            A.error.type('variable', a, t.indicator),
                          );
                      else e.throw_error(A.error.type('list', s, t.indicator));
                    else e.throw_error(A.error.type('atom', i, t.indicator));
                  },
                  'close/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(new k('close', [n, new k('[]', [])])),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'close/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n) || A.type.is_variable(i))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_list(i))
                      if (A.type.is_stream(n) || A.type.is_atom(n))
                        if (A.type.is_stream(a) && null !== a.stream) {
                          for (
                            var s, o = {}, p = i;
                            A.type.is_term(p) && './2' === p.indicator;

                          ) {
                            if (((s = p.args[0]), A.type.is_variable(s)))
                              return void e.throw_error(
                                A.error.instantiation(t.indicator),
                              );
                            if (!A.type.is_close_option(s))
                              return void e.throw_error(
                                A.error.domain('close_option', s, t.indicator),
                              );
                            (o[s.id] = 'true' === s.args[0].id),
                              (p = p.args[1]);
                          }
                          if ('[]/0' !== p.indicator)
                            return void (A.type.is_variable(p)
                              ? e.throw_error(
                                  A.error.instantiation(t.indicator),
                                )
                              : e.throw_error(
                                  A.error.type('list', i, t.indicator),
                                ));
                          if (
                            a === e.session.standard_input ||
                            a === e.session.standard_output
                          )
                            return void e.success(r);
                          a === e.session.current_input
                            ? (e.session.current_input =
                                e.session.standard_input)
                            : a === e.session.current_output &&
                              (e.session.current_output =
                                e.session.current_output),
                            null !== a.alias
                              ? delete e.session.streams[a.alias]
                              : delete e.session.streams[a.id],
                            a.output && a.stream.flush();
                          var l = a.stream.close();
                          (a.stream = null),
                            (!0 !== o.force && !0 !== l) || e.success(r);
                        } else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else e.throw_error(A.error.type('list', i, t.indicator));
                  },
                  'flush_output/0': function (e, r, t) {
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('flush_output', [new x('S')]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'flush_output/1': function (e, r, t) {
                    var n = t.args[0],
                      i = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_stream(n) || A.type.is_atom(n)
                      ? A.type.is_stream(i) && null !== i.stream
                        ? !0 === n.input
                          ? e.throw_error(
                              A.error.permission(
                                'output',
                                'stream',
                                output,
                                t.indicator,
                              ),
                            )
                          : (i.stream.flush(), e.success(r))
                        : e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          )
                      : e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                  },
                  'stream_property/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (
                      A.type.is_variable(n) ||
                      A.type.is_stream(n) ||
                      A.type.is_atom(n)
                    )
                      if (
                        A.type.is_variable(n) ||
                        (A.type.is_stream(a) && null !== a.stream)
                      )
                        if (
                          A.type.is_variable(i) ||
                          A.type.is_stream_property(i)
                        ) {
                          var s = [],
                            o = [];
                          if (A.type.is_variable(n))
                            for (var p in e.session.streams)
                              s.push(e.session.streams[p]);
                          else s.push(a);
                          for (var l = 0; l < s.length; l++) {
                            var u = [];
                            s[l].filename &&
                              u.push(
                                new k('file_name', [new k(s[l].file_name, [])]),
                              ),
                              u.push(new k('mode', [new k(s[l].mode, [])])),
                              u.push(
                                new k(s[l].input ? 'input' : 'output', []),
                              ),
                              s[l].alias &&
                                u.push(new k('alias', [new k(s[l].alias, [])])),
                              u.push(
                                new k('position', [
                                  'number' == typeof s[l].position
                                    ? new T(s[l].position, !1)
                                    : new k(s[l].position, []),
                                ]),
                              ),
                              u.push(
                                new k('end_of_stream', [
                                  new k(
                                    'end_of_stream' === s[l].position
                                      ? 'at'
                                      : 'past_end_of_stream' === s[l].position
                                      ? 'past'
                                      : 'not',
                                    [],
                                  ),
                                ]),
                              ),
                              u.push(
                                new k('eof_action', [
                                  new k(s[l].eof_action, []),
                                ]),
                              ),
                              u.push(
                                new k('reposition', [
                                  new k(s[l].reposition ? 'true' : 'false', []),
                                ]),
                              ),
                              u.push(new k('type', [new k(s[l].type, [])]));
                            for (var c = 0; c < u.length; c++)
                              o.push(
                                new P(
                                  r.goal.replace(
                                    new k(',', [
                                      new k('=', [
                                        A.type.is_variable(n) ? n : a,
                                        s[l],
                                      ]),
                                      new k('=', [i, u[c]]),
                                    ]),
                                  ),
                                  r.substitution,
                                  r,
                                ),
                              );
                          }
                          e.prepend(o);
                        } else
                          e.throw_error(
                            A.error.domain('stream_property', i, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.existence('stream', n, t.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.domain('stream_or_alias', n, t.indicator),
                      );
                  },
                  'at_end_of_stream/0': function (e, r, t) {
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k(',', [
                              new k('stream_property', [
                                new x('S'),
                                new k('end_of_stream', [new x('E')]),
                              ]),
                              new k(',', [
                                new k('!', []),
                                new k(';', [
                                  new k('=', [new x('E'), new k('at', [])]),
                                  new k('=', [new x('E'), new k('past', [])]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'at_end_of_stream/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('stream_property', [
                              n,
                              new k('end_of_stream', [new x('E')]),
                            ]),
                            new k(',', [
                              new k('!', []),
                              new k(';', [
                                new k('=', [new x('E'), new k('at', [])]),
                                new k('=', [new x('E'), new k('past', [])]),
                              ]),
                            ]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'set_stream_position/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    A.type.is_variable(n) || A.type.is_variable(i)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_stream(n) || A.type.is_atom(n)
                      ? A.type.is_stream(a) && null !== a.stream
                        ? A.type.is_stream_position(i)
                          ? !1 === a.reposition
                            ? e.throw_error(
                                A.error.permission(
                                  'reposition',
                                  'stream',
                                  n,
                                  t.indicator,
                                ),
                              )
                            : (A.type.is_integer(i)
                                ? (a.position = i.value)
                                : (a.position = i.id),
                              e.success(r))
                          : e.throw_error(
                              A.error.domain('stream_position', i, t.indicator),
                            )
                        : e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          )
                      : e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                  },
                  'get_char/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('get_char', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'get_char/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_character(i))
                      if (A.type.is_stream(n) || A.type.is_atom(n))
                        if (A.type.is_stream(a) && null !== a.stream)
                          if (a.output)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('binary' === a.type)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'binary_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === a.position &&
                            'error' === a.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            var s;
                            if ('end_of_stream' === a.position)
                              (s = 'end_of_file'),
                                (a.position = 'past_end_of_stream');
                            else {
                              if (null === (s = a.stream.get(1, a.position)))
                                return void e.throw_error(
                                  A.error.representation(
                                    'character',
                                    t.indicator,
                                  ),
                                );
                              a.position++;
                            }
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new k(s, []), i])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.type('in_character', i, t.indicator),
                      );
                  },
                  'get_code/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('get_code', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'get_code/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_integer(i))
                      if (
                        A.type.is_variable(n) ||
                        A.type.is_stream(n) ||
                        A.type.is_atom(n)
                      )
                        if (A.type.is_stream(a) && null !== a.stream)
                          if (a.output)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('binary' === a.type)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'binary_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === a.position &&
                            'error' === a.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            var o;
                            if ('end_of_stream' === a.position)
                              (o = -1), (a.position = 'past_end_of_stream');
                            else {
                              if (null === (o = a.stream.get(1, a.position)))
                                return void e.throw_error(
                                  A.error.representation(
                                    'character',
                                    t.indicator,
                                  ),
                                );
                              (o = s(o, 0)), a.position++;
                            }
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new T(o, !1), i])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else
                      e.throw_error(A.error.type('integer', char, t.indicator));
                  },
                  'peek_char/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('peek_char', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'peek_char/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_character(i))
                      if (A.type.is_stream(n) || A.type.is_atom(n))
                        if (A.type.is_stream(a) && null !== a.stream)
                          if (a.output)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('binary' === a.type)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'binary_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === a.position &&
                            'error' === a.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            var s;
                            if ('end_of_stream' === a.position)
                              (s = 'end_of_file'),
                                (a.position = 'past_end_of_stream');
                            else if (null === (s = a.stream.get(1, a.position)))
                              return void e.throw_error(
                                A.error.representation(
                                  'character',
                                  t.indicator,
                                ),
                              );
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new k(s, []), i])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else
                      e.throw_error(
                        A.error.type('in_character', i, t.indicator),
                      );
                  },
                  'peek_code/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('peek_code', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'peek_code/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_integer(i))
                      if (
                        A.type.is_variable(n) ||
                        A.type.is_stream(n) ||
                        A.type.is_atom(n)
                      )
                        if (A.type.is_stream(a) && null !== a.stream)
                          if (a.output)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('binary' === a.type)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'binary_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === a.position &&
                            'error' === a.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            var o;
                            if ('end_of_stream' === a.position)
                              (o = -1), (a.position = 'past_end_of_stream');
                            else {
                              if (null === (o = a.stream.get(1, a.position)))
                                return void e.throw_error(
                                  A.error.representation(
                                    'character',
                                    t.indicator,
                                  ),
                                );
                              o = s(o, 0);
                            }
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new T(o, !1), i])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else
                      e.throw_error(A.error.type('integer', char, t.indicator));
                  },
                  'put_char/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('put_char', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'put_char/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    A.type.is_variable(n) || A.type.is_variable(i)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_character(i)
                      ? A.type.is_variable(n) ||
                        A.type.is_stream(n) ||
                        A.type.is_atom(n)
                        ? A.type.is_stream(a) && null !== a.stream
                          ? a.input
                            ? e.throw_error(
                                A.error.permission(
                                  'output',
                                  'stream',
                                  n,
                                  t.indicator,
                                ),
                              )
                            : 'binary' === a.type
                            ? e.throw_error(
                                A.error.permission(
                                  'output',
                                  'binary_stream',
                                  n,
                                  t.indicator,
                                ),
                              )
                            : a.stream.put(i.id, a.position) &&
                              ('number' == typeof a.position && a.position++,
                              e.success(r))
                          : e.throw_error(
                              A.error.existence('stream', n, t.indicator),
                            )
                        : e.throw_error(
                            A.error.domain('stream_or_alias', n, t.indicator),
                          )
                      : e.throw_error(
                          A.error.type('character', i, t.indicator),
                        );
                  },
                  'put_code/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('put_code', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'put_code/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    A.type.is_variable(n) || A.type.is_variable(i)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_integer(i)
                      ? A.type.is_character_code(i)
                        ? A.type.is_variable(n) ||
                          A.type.is_stream(n) ||
                          A.type.is_atom(n)
                          ? A.type.is_stream(a) && null !== a.stream
                            ? a.input
                              ? e.throw_error(
                                  A.error.permission(
                                    'output',
                                    'stream',
                                    n,
                                    t.indicator,
                                  ),
                                )
                              : 'binary' === a.type
                              ? e.throw_error(
                                  A.error.permission(
                                    'output',
                                    'binary_stream',
                                    n,
                                    t.indicator,
                                  ),
                                )
                              : a.stream.put_char(o(i.value), a.position) &&
                                ('number' == typeof a.position && a.position++,
                                e.success(r))
                            : e.throw_error(
                                A.error.existence('stream', n, t.indicator),
                              )
                          : e.throw_error(
                              A.error.domain('stream_or_alias', n, t.indicator),
                            )
                        : e.throw_error(
                            A.error.representation(
                              'character_code',
                              t.indicator,
                            ),
                          )
                      : e.throw_error(A.error.type('integer', i, t.indicator));
                  },
                  'nl/0': function (e, r, t) {
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('put_char', [new x('S'), new k('\n', [])]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'nl/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(new k('put_char', [n, new k('\n', [])])),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'get_byte/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('get_byte', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'get_byte/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_byte(i))
                      if (A.type.is_stream(n) || A.type.is_atom(n))
                        if (A.type.is_stream(a) && null !== a.stream)
                          if (a.output)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('text' === a.type)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'text_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === a.position &&
                            'error' === a.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            var s;
                            if ('end_of_stream' === a.position)
                              (s = 'end_of_file'),
                                (a.position = 'past_end_of_stream');
                            else {
                              if (null === (s = a.stream.get_byte(a.position)))
                                return void e.throw_error(
                                  A.error.representation('byte', t.indicator),
                                );
                              a.position++;
                            }
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new T(s, !1), i])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else
                      e.throw_error(A.error.type('in_byte', char, t.indicator));
                  },
                  'peek_byte/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('peek_byte', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'peek_byte/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_variable(i) || A.type.is_byte(i))
                      if (A.type.is_stream(n) || A.type.is_atom(n))
                        if (A.type.is_stream(a) && null !== a.stream)
                          if (a.output)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('text' === a.type)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'text_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === a.position &&
                            'error' === a.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            var s;
                            if ('end_of_stream' === a.position)
                              (s = 'end_of_file'),
                                (a.position = 'past_end_of_stream');
                            else if (
                              null === (s = a.stream.get_byte(a.position))
                            )
                              return void e.throw_error(
                                A.error.representation('byte', t.indicator),
                              );
                            e.prepend([
                              new P(
                                r.goal.replace(new k('=', [new T(s, !1), i])),
                                r.substitution,
                                r,
                              ),
                            ]);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else
                      e.throw_error(A.error.type('in_byte', char, t.indicator));
                  },
                  'put_byte/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('put_byte', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'put_byte/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    A.type.is_variable(n) || A.type.is_variable(i)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_byte(i)
                      ? A.type.is_variable(n) ||
                        A.type.is_stream(n) ||
                        A.type.is_atom(n)
                        ? A.type.is_stream(a) && null !== a.stream
                          ? a.input
                            ? e.throw_error(
                                A.error.permission(
                                  'output',
                                  'stream',
                                  n,
                                  t.indicator,
                                ),
                              )
                            : 'text' === a.type
                            ? e.throw_error(
                                A.error.permission(
                                  'output',
                                  'text_stream',
                                  n,
                                  t.indicator,
                                ),
                              )
                            : a.stream.put_byte(i.value, a.position) &&
                              ('number' == typeof a.position && a.position++,
                              e.success(r))
                          : e.throw_error(
                              A.error.existence('stream', n, t.indicator),
                            )
                        : e.throw_error(
                            A.error.domain('stream_or_alias', n, t.indicator),
                          )
                      : e.throw_error(A.error.type('byte', i, t.indicator));
                  },
                  'read/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('read_term', [
                              new x('S'),
                              n,
                              new k('[]', []),
                            ]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'read/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k('read_term', [n, i, new k('[]', [])]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'read_term/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_input', [new x('S')]),
                            new k('read_term', [new x('S'), n, i]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'read_term/3': function (e, r, t) {
                    var n = t.args[0],
                      a = t.args[1],
                      s = t.args[2],
                      o = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n) || A.type.is_variable(s))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_list(s))
                      if (A.type.is_stream(n) || A.type.is_atom(n))
                        if (A.type.is_stream(o) && null !== o.stream)
                          if (o.output)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('binary' === o.type)
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'binary_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === o.position &&
                            'error' === o.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'input',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            for (
                              var p, l = {}, u = s;
                              A.type.is_term(u) && './2' === u.indicator;

                            ) {
                              if (((p = u.args[0]), A.type.is_variable(p)))
                                return void e.throw_error(
                                  A.error.instantiation(t.indicator),
                                );
                              if (!A.type.is_read_option(p))
                                return void e.throw_error(
                                  A.error.domain('read_option', p, t.indicator),
                                );
                              (l[p.id] = p.args[0]), (u = u.args[1]);
                            }
                            if ('[]/0' !== u.indicator)
                              return void (A.type.is_variable(u)
                                ? e.throw_error(
                                    A.error.instantiation(t.indicator),
                                  )
                                : e.throw_error(
                                    A.error.type('list', s, t.indicator),
                                  ));
                            for (
                              var c, y, _, w = '', h = [], v = null;
                              null === v ||
                              'atom' !== v.name ||
                              '.' !== v.value ||
                              (0 === _.type &&
                                'token_not_found' ===
                                  A.flatten_error(new k('throw', [_.value]))
                                    .found);

                            ) {
                              if (null === (c = o.stream.get(1, o.position)))
                                return void e.throw_error(
                                  A.error.representation(
                                    'character',
                                    t.indicator,
                                  ),
                                );
                              if (
                                'end_of_file' === c ||
                                'past_end_of_file' === c
                              )
                                return void (_
                                  ? e.throw_error(
                                      A.error.syntax(
                                        h[_.len - 1],
                                        '. or expression expected',
                                        !1,
                                      ),
                                    )
                                  : e.throw_error(
                                      A.error.syntax(
                                        null,
                                        'token not found',
                                        !0,
                                      ),
                                    ));
                              o.position++,
                                (w += c),
                                (y = new f(e)).new_text(w),
                                (v =
                                  null !== (h = y.get_tokens()) && h.length > 0
                                    ? h[h.length - 1]
                                    : null),
                                null !== h &&
                                  (_ = d(e, h, 0, e.__get_max_priority(), !1));
                            }
                            if (
                              1 === _.type &&
                              _.len === h.length - 1 &&
                              '.' === v.value
                            ) {
                              var b = new k('=', [a, (_ = _.value.rename(e))]);
                              if (l.variables) {
                                var T = g(
                                  i(m(_.variables()), function (e) {
                                    return new x(e);
                                  }),
                                );
                                b = new k(',', [
                                  b,
                                  new k('=', [l.variables, T]),
                                ]);
                              }
                              if (l.variable_names) {
                                T = g(
                                  i(m(_.variables()), function (r) {
                                    var t;
                                    for (t in e.session.renamed_variables)
                                      if (
                                        e.session.renamed_variables.hasOwnProperty(
                                          t,
                                        ) &&
                                        e.session.renamed_variables[t] === r
                                      )
                                        break;
                                    return new k('=', [new k(t, []), new x(r)]);
                                  }),
                                );
                                b = new k(',', [
                                  b,
                                  new k('=', [l.variable_names, T]),
                                ]);
                              }
                              if (l.singletons) {
                                T = g(
                                  i(
                                    new C(_, null).singleton_variables(),
                                    function (r) {
                                      var t;
                                      for (t in e.session.renamed_variables)
                                        if (
                                          e.session.renamed_variables.hasOwnProperty(
                                            t,
                                          ) &&
                                          e.session.renamed_variables[t] === r
                                        )
                                          break;
                                      return new k('=', [
                                        new k(t, []),
                                        new x(r),
                                      ]);
                                    },
                                  ),
                                );
                                b = new k(',', [
                                  b,
                                  new k('=', [l.singletons, T]),
                                ]);
                              }
                              e.prepend([
                                new P(r.goal.replace(b), r.substitution, r),
                              ]);
                            } else
                              1 === _.type
                                ? e.throw_error(
                                    A.error.syntax(
                                      h[_.len],
                                      'unexpected token',
                                      !1,
                                    ),
                                  )
                                : e.throw_error(_.value);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else e.throw_error(A.error.type('list', s, t.indicator));
                  },
                  'write/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('write', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'write/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k('write_term', [
                            n,
                            i,
                            new k('.', [
                              new k('quoted', [new k('false', [])]),
                              new k('.', [
                                new k('ignore_ops', [new k('false')]),
                                new k('.', [
                                  new k('numbervars', [new k('true')]),
                                  new k('[]', []),
                                ]),
                              ]),
                            ]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'writeq/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('writeq', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'writeq/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k('write_term', [
                            n,
                            i,
                            new k('.', [
                              new k('quoted', [new k('true', [])]),
                              new k('.', [
                                new k('ignore_ops', [new k('false')]),
                                new k('.', [
                                  new k('numbervars', [new k('true')]),
                                  new k('[]', []),
                                ]),
                              ]),
                            ]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'write_canonical/1': function (e, r, t) {
                    var n = t.args[0];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('write_canonical', [new x('S'), n]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'write_canonical/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k('write_term', [
                            n,
                            i,
                            new k('.', [
                              new k('quoted', [new k('true', [])]),
                              new k('.', [
                                new k('ignore_ops', [new k('true')]),
                                new k('.', [
                                  new k('numbervars', [new k('false')]),
                                  new k('[]', []),
                                ]),
                              ]),
                            ]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'write_term/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    e.prepend([
                      new P(
                        r.goal.replace(
                          new k(',', [
                            new k('current_output', [new x('S')]),
                            new k('write_term', [new x('S'), n, i]),
                          ]),
                        ),
                        r.substitution,
                        r,
                      ),
                    ]);
                  },
                  'write_term/3': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1],
                      a = t.args[2],
                      s = A.type.is_stream(n) ? n : e.get_stream_by_alias(n.id);
                    if (A.type.is_variable(n) || A.type.is_variable(a))
                      e.throw_error(A.error.instantiation(t.indicator));
                    else if (A.type.is_list(a))
                      if (A.type.is_stream(n) || A.type.is_atom(n))
                        if (A.type.is_stream(s) && null !== s.stream)
                          if (s.input)
                            e.throw_error(
                              A.error.permission(
                                'output',
                                'stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if ('binary' === s.type)
                            e.throw_error(
                              A.error.permission(
                                'output',
                                'binary_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else if (
                            'past_end_of_stream' === s.position &&
                            'error' === s.eof_action
                          )
                            e.throw_error(
                              A.error.permission(
                                'output',
                                'past_end_of_stream',
                                n,
                                t.indicator,
                              ),
                            );
                          else {
                            for (
                              var o, p = {}, l = a;
                              A.type.is_term(l) && './2' === l.indicator;

                            ) {
                              if (((o = l.args[0]), A.type.is_variable(o)))
                                return void e.throw_error(
                                  A.error.instantiation(t.indicator),
                                );
                              if (!A.type.is_write_option(o))
                                return void e.throw_error(
                                  A.error.domain(
                                    'write_option',
                                    o,
                                    t.indicator,
                                  ),
                                );
                              (p[o.id] = 'true' === o.args[0].id),
                                (l = l.args[1]);
                            }
                            if ('[]/0' !== l.indicator)
                              return void (A.type.is_variable(l)
                                ? e.throw_error(
                                    A.error.instantiation(t.indicator),
                                  )
                                : e.throw_error(
                                    A.error.type('list', a, t.indicator),
                                  ));
                            p.session = e.session;
                            var u = i.toString(p);
                            s.stream.put(u, s.position),
                              'number' == typeof s.position &&
                                (s.position += u.length),
                              e.success(r);
                          }
                        else
                          e.throw_error(
                            A.error.existence('stream', n, t.indicator),
                          );
                      else
                        e.throw_error(
                          A.error.domain('stream_or_alias', n, t.indicator),
                        );
                    else e.throw_error(A.error.type('list', a, t.indicator));
                  },
                  'halt/0': function (e, r, t) {
                    e.points = [];
                  },
                  'halt/1': function (e, r, t) {
                    var n = t.args[0];
                    A.type.is_variable(n)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_integer(n)
                      ? (e.points = [])
                      : e.throw_error(A.error.type('integer', n, t.indicator));
                  },
                  'current_prolog_flag/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    if (A.type.is_variable(n) || A.type.is_atom(n))
                      if (A.type.is_variable(n) || A.type.is_flag(n)) {
                        var a = [];
                        for (var s in A.flag)
                          if (A.flag.hasOwnProperty(s)) {
                            var o = new k(',', [
                              new k('=', [new k(s), n]),
                              new k('=', [e.get_flag(s), i]),
                            ]);
                            a.push(new P(r.goal.replace(o), r.substitution, r));
                          }
                        e.prepend(a);
                      } else
                        e.throw_error(
                          A.error.domain('prolog_flag', n, t.indicator),
                        );
                    else e.throw_error(A.error.type('atom', n, t.indicator));
                  },
                  'set_prolog_flag/2': function (e, r, t) {
                    var n = t.args[0],
                      i = t.args[1];
                    A.type.is_variable(n) || A.type.is_variable(i)
                      ? e.throw_error(A.error.instantiation(t.indicator))
                      : A.type.is_atom(n)
                      ? A.type.is_flag(n)
                        ? A.type.is_value_flag(n, i)
                          ? A.type.is_modifiable_flag(n)
                            ? ((e.session.flag[n.id] = i), e.success(r))
                            : e.throw_error(
                                A.error.permission('modify', 'flag', n),
                              )
                          : e.throw_error(
                              A.error.domain(
                                'flag_value',
                                new k('+', [n, i]),
                                t.indicator,
                              ),
                            )
                        : e.throw_error(
                            A.error.domain('prolog_flag', n, t.indicator),
                          )
                      : e.throw_error(A.error.type('atom', n, t.indicator));
                  },
                },
                flag: {
                  bounded: {
                    allowed: [new k('true'), new k('false')],
                    value: new k('true'),
                    changeable: !1,
                  },
                  max_integer: {
                    allowed: [new T(Number.MAX_SAFE_INTEGER)],
                    value: new T(Number.MAX_SAFE_INTEGER),
                    changeable: !1,
                  },
                  min_integer: {
                    allowed: [new T(Number.MIN_SAFE_INTEGER)],
                    value: new T(Number.MIN_SAFE_INTEGER),
                    changeable: !1,
                  },
                  integer_rounding_function: {
                    allowed: [new k('down'), new k('toward_zero')],
                    value: new k('toward_zero'),
                    changeable: !1,
                  },
                  char_conversion: {
                    allowed: [new k('on'), new k('off')],
                    value: new k('on'),
                    changeable: !0,
                  },
                  debug: {
                    allowed: [new k('on'), new k('off')],
                    value: new k('off'),
                    changeable: !0,
                  },
                  max_arity: {
                    allowed: [new k('unbounded')],
                    value: new k('unbounded'),
                    changeable: !1,
                  },
                  unknown: {
                    allowed: [new k('error'), new k('fail'), new k('warning')],
                    value: new k('error'),
                    changeable: !0,
                  },
                  double_quotes: {
                    allowed: [new k('chars'), new k('codes'), new k('atom')],
                    value: new k('codes'),
                    changeable: !0,
                  },
                  occurs_check: {
                    allowed: [new k('false'), new k('true')],
                    value: new k('false'),
                    changeable: !0,
                  },
                  dialect: {
                    allowed: [new k('tau')],
                    value: new k('tau'),
                    changeable: !1,
                  },
                  version_data: {
                    allowed: [
                      new k('tau', [
                        new T(n.major, !1),
                        new T(n.minor, !1),
                        new T(n.patch, !1),
                        new k(n.status),
                      ]),
                    ],
                    value: new k('tau', [
                      new T(n.major, !1),
                      new T(n.minor, !1),
                      new T(n.patch, !1),
                      new k(n.status),
                    ]),
                    changeable: !1,
                  },
                  nodejs: {
                    allowed: [new k('yes'), new k('no')],
                    value: new k(e.exports ? 'yes' : 'no'),
                    changeable: !1,
                  },
                },
                unify: function (e, r, t) {
                  t = void 0 !== t && t;
                  for (
                    var n = [{ left: e, right: r }], i = {};
                    0 !== n.length;

                  ) {
                    var a = n.pop();
                    if (
                      ((e = a.left),
                      (r = a.right),
                      A.type.is_term(e) && A.type.is_term(r))
                    ) {
                      if (e.indicator !== r.indicator) return null;
                      for (var s = 0; s < e.args.length; s++)
                        n.push({ left: e.args[s], right: r.args[s] });
                    } else if (A.type.is_number(e) && A.type.is_number(r)) {
                      if (e.value !== r.value || e.is_float !== r.is_float)
                        return null;
                    } else if (A.type.is_variable(e)) {
                      if (A.type.is_variable(r) && e.id === r.id) continue;
                      if (!0 === t && -1 !== r.variables().indexOf(e.id))
                        return null;
                      if ('_' !== e.id) {
                        var o = new E();
                        o.add(e.id, r);
                        for (s = 0; s < n.length; s++)
                          (n[s].left = n[s].left.apply(o)),
                            (n[s].right = n[s].right.apply(o));
                        for (var s in i) i[s] = i[s].apply(o);
                        i[e.id] = r;
                      }
                    } else if (A.type.is_variable(r))
                      n.push({ left: r, right: e });
                    else {
                      if (void 0 === e.unify) return null;
                      if (!e.unify(r)) return null;
                    }
                  }
                  return new E(i);
                },
                compare: function (e, r) {
                  var t = A.type.compare(e, r);
                  return 0 !== t ? t : e.compare(r);
                },
                arithmetic_compare: function (e, r, t) {
                  var n = r.interpret(e);
                  if (A.type.is_number(n)) {
                    var i = t.interpret(e);
                    return A.type.is_number(i)
                      ? n.value < i.value
                        ? -1
                        : n.value > i.value
                        ? 1
                        : 0
                      : i;
                  }
                  return n;
                },
                operate: function (e, r) {
                  if (A.type.is_operator(r)) {
                    for (
                      var t, n = A.type.is_operator(r), i = [], a = !1, s = 0;
                      s < r.args.length;
                      s++
                    ) {
                      if (((t = r.args[s].interpret(e)), !A.type.is_number(t)))
                        return t;
                      if (null !== n.type_args && t.is_float !== n.type_args)
                        return A.error.type(
                          n.type_args ? 'float' : 'integer',
                          t,
                          e.__call_indicator,
                        );
                      i.push(t.value), (a = a || t.is_float);
                    }
                    return (
                      i.push(e),
                      (t = A.arithmetic.evaluation[r.indicator].fn.apply(
                        this,
                        i,
                      )),
                      (a = null === n.type_result ? a : n.type_result),
                      A.type.is_term(t)
                        ? t
                        : t === Number.POSITIVE_INFINITY ||
                          t === Number.NEGATIVE_INFINITY
                        ? A.error.evaluation('overflow', e.__call_indicator)
                        : !1 === a &&
                          'true' === e.get_flag('bounded').id &&
                          (t > e.get_flag('max_integer').value ||
                            t < e.get_flag('min_integer').value)
                        ? A.error.evaluation('int_overflow', e.__call_indicator)
                        : new T(t, a)
                    );
                  }
                  return A.error.type(
                    'evaluable',
                    r.indicator,
                    e.__call_indicator,
                  );
                },
                error: {
                  existence: function (e, r, t) {
                    return (
                      'string' == typeof r && (r = b(r)),
                      new k('error', [
                        new k('existence_error', [new k(e), r]),
                        b(t),
                      ])
                    );
                  },
                  type: function (e, r, t) {
                    return new k('error', [
                      new k('type_error', [new k(e), r]),
                      b(t),
                    ]);
                  },
                  instantiation: function (e) {
                    return new k('error', [new k('instantiation_error'), b(e)]);
                  },
                  domain: function (e, r, t) {
                    return new k('error', [
                      new k('domain_error', [new k(e), r]),
                      b(t),
                    ]);
                  },
                  representation: function (e, r) {
                    return new k('error', [
                      new k('representation_error', [new k(e)]),
                      b(r),
                    ]);
                  },
                  permission: function (e, r, t, n) {
                    return new k('error', [
                      new k('permission_error', [new k(e), new k(r), t]),
                      b(n),
                    ]);
                  },
                  evaluation: function (e, r) {
                    return new k('error', [
                      new k('evaluation_error', [new k(e)]),
                      b(r),
                    ]);
                  },
                  syntax: function (e, r, t) {
                    e = e || {
                      value: '',
                      line: 0,
                      column: 0,
                      matches: [''],
                      start: 0,
                    };
                    var n =
                        t && e.matches.length > 0
                          ? e.start + e.matches[0].length
                          : e.start,
                      i = t
                        ? new k('token_not_found')
                        : new k('found', [new k(e.value.toString())]),
                      a = new k('.', [
                        new k('line', [new T(e.line + 1)]),
                        new k('.', [
                          new k('column', [new T(n + 1)]),
                          new k('.', [i, new k('[]', [])]),
                        ]),
                      ]);
                    return new k('error', [
                      new k('syntax_error', [new k(r)]),
                      a,
                    ]);
                  },
                  syntax_by_predicate: function (e, r) {
                    return new k('error', [
                      new k('syntax_error', [new k(e)]),
                      b(r),
                    ]);
                  },
                },
                warning: {
                  singleton: function (e, r, t) {
                    for (var n = new k('[]'), i = e.length - 1; i >= 0; i--)
                      n = new k('.', [new x(e[i]), n]);
                    return new k('warning', [
                      new k('singleton_variables', [n, b(r)]),
                      new k('.', [new k('line', [new T(t, !1)]), new k('[]')]),
                    ]);
                  },
                  failed_goal: function (e, r) {
                    return new k('warning', [
                      new k('failed_goal', [e]),
                      new k('.', [new k('line', [new T(r, !1)]), new k('[]')]),
                    ]);
                  },
                },
                format_variable: function (e) {
                  return '_' + e;
                },
                format_answer: function (e, r, t) {
                  if (
                    (r instanceof I && (r = r.thread),
                    ((t = t || {}).session = r ? r.session : void 0),
                    A.type.is_error(e))
                  )
                    return 'uncaught exception: ' + e.args[0].toString();
                  if (!1 === e) return 'false.';
                  if (null === e) return 'limit exceeded ;';
                  var n = 0,
                    i = '';
                  if (A.type.is_substitution(e)) {
                    var a = e.domain(!0);
                    e = e.filter(function (e, r) {
                      return (
                        !A.type.is_variable(r) ||
                        (-1 !== a.indexOf(r.id) && e !== r.id)
                      );
                    });
                  }
                  for (var s in e.links)
                    e.links.hasOwnProperty(s) &&
                      (n++,
                      '' !== i && (i += ', '),
                      (i += s.toString(t) + ' = ' + e.links[s].toString(t)));
                  var o = void 0 === r || r.points.length > 0 ? ' ;' : '.';
                  return 0 === n ? 'true' + o : i + o;
                },
                flatten_error: function (e) {
                  if (!A.type.is_error(e)) return null;
                  e = e.args[0];
                  var r = {};
                  return (
                    (r.type = e.args[0].id),
                    (r.thrown =
                      'syntax_error' === r.type ? null : e.args[1].id),
                    (r.expected = null),
                    (r.found = null),
                    (r.representation = null),
                    (r.existence = null),
                    (r.existence_type = null),
                    (r.line = null),
                    (r.column = null),
                    (r.permission_operation = null),
                    (r.permission_type = null),
                    (r.evaluation_type = null),
                    'type_error' === r.type || 'domain_error' === r.type
                      ? ((r.expected = e.args[0].args[0].id),
                        (r.found = e.args[0].args[1].toString()))
                      : 'syntax_error' === r.type
                      ? './2' === e.args[1].indicator
                        ? ((r.expected = e.args[0].args[0].id),
                          (r.found = e.args[1].args[1].args[1].args[0]),
                          (r.found =
                            'token_not_found' === r.found.id
                              ? r.found.id
                              : r.found.args[0].id),
                          (r.line = e.args[1].args[0].args[0].value),
                          (r.column = e.args[1].args[1].args[0].args[0].value))
                        : (r.thrown = e.args[1].id)
                      : 'permission_error' === r.type
                      ? ((r.found = e.args[0].args[2].toString()),
                        (r.permission_operation = e.args[0].args[0].id),
                        (r.permission_type = e.args[0].args[1].id))
                      : 'evaluation_error' === r.type
                      ? (r.evaluation_type = e.args[0].args[0].id)
                      : 'representation_error' === r.type
                      ? (r.representation = e.args[0].args[0].id)
                      : 'existence_error' === r.type &&
                        ((r.existence = e.args[0].args[1].toString()),
                        (r.existence_type = e.args[0].args[0].id)),
                    r
                  );
                },
                create: function (e) {
                  return new A.type.Session(e);
                },
              };
              e.exports = A;
            })();
          },
          5047: (e) => {
            !(function (r) {
              var t = [
                'append/2',
                'append/3',
                'member/2',
                'permutation/2',
                'maplist/2',
                'maplist/3',
                'maplist/4',
                'maplist/5',
                'maplist/6',
                'maplist/7',
                'maplist/8',
                'include/3',
                'exclude/3',
                'foldl/4',
                'sum_list/2',
                'max_list/2',
                'min_list/2',
                'prod_list/2',
                'last/2',
                'prefix/2',
                'nth0/3',
                'nth1/3',
                'nth0/4',
                'nth1/4',
                'length/2',
                'replicate/3',
                'select/3',
                'sort/2',
                'msort/2',
                'keysort/2',
                'take/3',
                'drop/3',
                'reverse/2',
                'list_to_set/2',
              ];
              e.exports = function (e) {
                new (r = e).type.Module(
                  'lists',
                  {
                    'append/2': [
                      new r.type.Rule(
                        new r.type.Term('append', [
                          new r.type.Var('X'),
                          new r.type.Var('L'),
                        ]),
                        new r.type.Term('foldl', [
                          new r.type.Term('append', []),
                          new r.type.Var('X'),
                          new r.type.Term('[]', []),
                          new r.type.Var('L'),
                        ]),
                      ),
                    ],
                    'append/3': [
                      new r.type.Rule(
                        new r.type.Term('append', [
                          new r.type.Term('[]', []),
                          new r.type.Var('X'),
                          new r.type.Var('X'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('append', [
                          new r.type.Term('.', [
                            new r.type.Var('H'),
                            new r.type.Var('T'),
                          ]),
                          new r.type.Var('X'),
                          new r.type.Term('.', [
                            new r.type.Var('H'),
                            new r.type.Var('S'),
                          ]),
                        ]),
                        new r.type.Term('append', [
                          new r.type.Var('T'),
                          new r.type.Var('X'),
                          new r.type.Var('S'),
                        ]),
                      ),
                    ],
                    'member/2': [
                      new r.type.Rule(
                        new r.type.Term('member', [
                          new r.type.Var('X'),
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('_'),
                          ]),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('member', [
                          new r.type.Var('X'),
                          new r.type.Term('.', [
                            new r.type.Var('_'),
                            new r.type.Var('Xs'),
                          ]),
                        ]),
                        new r.type.Term('member', [
                          new r.type.Var('X'),
                          new r.type.Var('Xs'),
                        ]),
                      ),
                    ],
                    'permutation/2': [
                      new r.type.Rule(
                        new r.type.Term('permutation', [
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('permutation', [
                          new r.type.Term('.', [
                            new r.type.Var('H'),
                            new r.type.Var('T'),
                          ]),
                          new r.type.Var('S'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('permutation', [
                            new r.type.Var('T'),
                            new r.type.Var('P'),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('append', [
                              new r.type.Var('X'),
                              new r.type.Var('Y'),
                              new r.type.Var('P'),
                            ]),
                            new r.type.Term('append', [
                              new r.type.Var('X'),
                              new r.type.Term('.', [
                                new r.type.Var('H'),
                                new r.type.Var('Y'),
                              ]),
                              new r.type.Var('S'),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'maplist/2': [
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('call', [
                            new r.type.Var('P'),
                            new r.type.Var('X'),
                          ]),
                          new r.type.Term('maplist', [
                            new r.type.Var('P'),
                            new r.type.Var('Xs'),
                          ]),
                        ]),
                      ),
                    ],
                    'maplist/3': [
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('A'),
                            new r.type.Var('As'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('B'),
                            new r.type.Var('Bs'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('call', [
                            new r.type.Var('P'),
                            new r.type.Var('A'),
                            new r.type.Var('B'),
                          ]),
                          new r.type.Term('maplist', [
                            new r.type.Var('P'),
                            new r.type.Var('As'),
                            new r.type.Var('Bs'),
                          ]),
                        ]),
                      ),
                    ],
                    'maplist/4': [
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('A'),
                            new r.type.Var('As'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('B'),
                            new r.type.Var('Bs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('C'),
                            new r.type.Var('Cs'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('call', [
                            new r.type.Var('P'),
                            new r.type.Var('A'),
                            new r.type.Var('B'),
                            new r.type.Var('C'),
                          ]),
                          new r.type.Term('maplist', [
                            new r.type.Var('P'),
                            new r.type.Var('As'),
                            new r.type.Var('Bs'),
                            new r.type.Var('Cs'),
                          ]),
                        ]),
                      ),
                    ],
                    'maplist/5': [
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('A'),
                            new r.type.Var('As'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('B'),
                            new r.type.Var('Bs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('C'),
                            new r.type.Var('Cs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('D'),
                            new r.type.Var('Ds'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('call', [
                            new r.type.Var('P'),
                            new r.type.Var('A'),
                            new r.type.Var('B'),
                            new r.type.Var('C'),
                            new r.type.Var('D'),
                          ]),
                          new r.type.Term('maplist', [
                            new r.type.Var('P'),
                            new r.type.Var('As'),
                            new r.type.Var('Bs'),
                            new r.type.Var('Cs'),
                            new r.type.Var('Ds'),
                          ]),
                        ]),
                      ),
                    ],
                    'maplist/6': [
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('A'),
                            new r.type.Var('As'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('B'),
                            new r.type.Var('Bs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('C'),
                            new r.type.Var('Cs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('D'),
                            new r.type.Var('Ds'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('E'),
                            new r.type.Var('Es'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('call', [
                            new r.type.Var('P'),
                            new r.type.Var('A'),
                            new r.type.Var('B'),
                            new r.type.Var('C'),
                            new r.type.Var('D'),
                            new r.type.Var('E'),
                          ]),
                          new r.type.Term('maplist', [
                            new r.type.Var('P'),
                            new r.type.Var('As'),
                            new r.type.Var('Bs'),
                            new r.type.Var('Cs'),
                            new r.type.Var('Ds'),
                            new r.type.Var('Es'),
                          ]),
                        ]),
                      ),
                    ],
                    'maplist/7': [
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('A'),
                            new r.type.Var('As'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('B'),
                            new r.type.Var('Bs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('C'),
                            new r.type.Var('Cs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('D'),
                            new r.type.Var('Ds'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('E'),
                            new r.type.Var('Es'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('F'),
                            new r.type.Var('Fs'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('call', [
                            new r.type.Var('P'),
                            new r.type.Var('A'),
                            new r.type.Var('B'),
                            new r.type.Var('C'),
                            new r.type.Var('D'),
                            new r.type.Var('E'),
                            new r.type.Var('F'),
                          ]),
                          new r.type.Term('maplist', [
                            new r.type.Var('P'),
                            new r.type.Var('As'),
                            new r.type.Var('Bs'),
                            new r.type.Var('Cs'),
                            new r.type.Var('Ds'),
                            new r.type.Var('Es'),
                            new r.type.Var('Fs'),
                          ]),
                        ]),
                      ),
                    ],
                    'maplist/8': [
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('maplist', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('A'),
                            new r.type.Var('As'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('B'),
                            new r.type.Var('Bs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('C'),
                            new r.type.Var('Cs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('D'),
                            new r.type.Var('Ds'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('E'),
                            new r.type.Var('Es'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('F'),
                            new r.type.Var('Fs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('G'),
                            new r.type.Var('Gs'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('call', [
                            new r.type.Var('P'),
                            new r.type.Var('A'),
                            new r.type.Var('B'),
                            new r.type.Var('C'),
                            new r.type.Var('D'),
                            new r.type.Var('E'),
                            new r.type.Var('F'),
                            new r.type.Var('G'),
                          ]),
                          new r.type.Term('maplist', [
                            new r.type.Var('P'),
                            new r.type.Var('As'),
                            new r.type.Var('Bs'),
                            new r.type.Var('Cs'),
                            new r.type.Var('Ds'),
                            new r.type.Var('Es'),
                            new r.type.Var('Fs'),
                            new r.type.Var('Gs'),
                          ]),
                        ]),
                      ),
                    ],
                    'include/3': [
                      new r.type.Rule(
                        new r.type.Term('include', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('include', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('H'),
                            new r.type.Var('T'),
                          ]),
                          new r.type.Var('L'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('=..', [
                            new r.type.Var('P'),
                            new r.type.Var('A'),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('append', [
                              new r.type.Var('A'),
                              new r.type.Term('.', [
                                new r.type.Var('H'),
                                new r.type.Term('[]', []),
                              ]),
                              new r.type.Var('B'),
                            ]),
                            new r.type.Term(',', [
                              new r.type.Term('=..', [
                                new r.type.Var('F'),
                                new r.type.Var('B'),
                              ]),
                              new r.type.Term(',', [
                                new r.type.Term(';', [
                                  new r.type.Term(',', [
                                    new r.type.Term('call', [
                                      new r.type.Var('F'),
                                    ]),
                                    new r.type.Term(',', [
                                      new r.type.Term('=', [
                                        new r.type.Var('L'),
                                        new r.type.Term('.', [
                                          new r.type.Var('H'),
                                          new r.type.Var('S'),
                                        ]),
                                      ]),
                                      new r.type.Term('!', []),
                                    ]),
                                  ]),
                                  new r.type.Term('=', [
                                    new r.type.Var('L'),
                                    new r.type.Var('S'),
                                  ]),
                                ]),
                                new r.type.Term('include', [
                                  new r.type.Var('P'),
                                  new r.type.Var('T'),
                                  new r.type.Var('S'),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'exclude/3': [
                      new r.type.Rule(
                        new r.type.Term('exclude', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Term('[]', []),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('exclude', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('H'),
                            new r.type.Var('T'),
                          ]),
                          new r.type.Var('S'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('exclude', [
                            new r.type.Var('P'),
                            new r.type.Var('T'),
                            new r.type.Var('E'),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('=..', [
                              new r.type.Var('P'),
                              new r.type.Var('L'),
                            ]),
                            new r.type.Term(',', [
                              new r.type.Term('append', [
                                new r.type.Var('L'),
                                new r.type.Term('.', [
                                  new r.type.Var('H'),
                                  new r.type.Term('[]', []),
                                ]),
                                new r.type.Var('Q'),
                              ]),
                              new r.type.Term(',', [
                                new r.type.Term('=..', [
                                  new r.type.Var('R'),
                                  new r.type.Var('Q'),
                                ]),
                                new r.type.Term(';', [
                                  new r.type.Term(',', [
                                    new r.type.Term('call', [
                                      new r.type.Var('R'),
                                    ]),
                                    new r.type.Term(',', [
                                      new r.type.Term('!', []),
                                      new r.type.Term('=', [
                                        new r.type.Var('S'),
                                        new r.type.Var('E'),
                                      ]),
                                    ]),
                                  ]),
                                  new r.type.Term('=', [
                                    new r.type.Var('S'),
                                    new r.type.Term('.', [
                                      new r.type.Var('H'),
                                      new r.type.Var('E'),
                                    ]),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'foldl/4': [
                      new r.type.Rule(
                        new r.type.Term('foldl', [
                          new r.type.Var('_'),
                          new r.type.Term('[]', []),
                          new r.type.Var('I'),
                          new r.type.Var('I'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('foldl', [
                          new r.type.Var('P'),
                          new r.type.Term('.', [
                            new r.type.Var('H'),
                            new r.type.Var('T'),
                          ]),
                          new r.type.Var('I'),
                          new r.type.Var('R'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('=..', [
                            new r.type.Var('P'),
                            new r.type.Var('L'),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('append', [
                              new r.type.Var('L'),
                              new r.type.Term('.', [
                                new r.type.Var('I'),
                                new r.type.Term('.', [
                                  new r.type.Var('H'),
                                  new r.type.Term('.', [
                                    new r.type.Var('X'),
                                    new r.type.Term('[]', []),
                                  ]),
                                ]),
                              ]),
                              new r.type.Var('L2'),
                            ]),
                            new r.type.Term(',', [
                              new r.type.Term('=..', [
                                new r.type.Var('P2'),
                                new r.type.Var('L2'),
                              ]),
                              new r.type.Term(',', [
                                new r.type.Term('call', [new r.type.Var('P2')]),
                                new r.type.Term('foldl', [
                                  new r.type.Var('P'),
                                  new r.type.Var('T'),
                                  new r.type.Var('X'),
                                  new r.type.Var('R'),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'select/3': [
                      new r.type.Rule(
                        new r.type.Term('select', [
                          new r.type.Var('E'),
                          new r.type.Term('.', [
                            new r.type.Var('E'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('Xs'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('select', [
                          new r.type.Var('E'),
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Ys'),
                          ]),
                        ]),
                        new r.type.Term('select', [
                          new r.type.Var('E'),
                          new r.type.Var('Xs'),
                          new r.type.Var('Ys'),
                        ]),
                      ),
                    ],
                    'sum_list/2': [
                      new r.type.Rule(
                        new r.type.Term('sum_list', [
                          new r.type.Term('[]', []),
                          new r.type.Num(0, !1),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('sum_list', [
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('S'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('sum_list', [
                            new r.type.Var('Xs'),
                            new r.type.Var('Y'),
                          ]),
                          new r.type.Term('is', [
                            new r.type.Var('S'),
                            new r.type.Term('+', [
                              new r.type.Var('X'),
                              new r.type.Var('Y'),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'max_list/2': [
                      new r.type.Rule(
                        new r.type.Term('max_list', [
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Term('[]', []),
                          ]),
                          new r.type.Var('X'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('max_list', [
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('S'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('max_list', [
                            new r.type.Var('Xs'),
                            new r.type.Var('Y'),
                          ]),
                          new r.type.Term(';', [
                            new r.type.Term(',', [
                              new r.type.Term('>=', [
                                new r.type.Var('X'),
                                new r.type.Var('Y'),
                              ]),
                              new r.type.Term(',', [
                                new r.type.Term('=', [
                                  new r.type.Var('S'),
                                  new r.type.Var('X'),
                                ]),
                                new r.type.Term('!', []),
                              ]),
                            ]),
                            new r.type.Term('=', [
                              new r.type.Var('S'),
                              new r.type.Var('Y'),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'min_list/2': [
                      new r.type.Rule(
                        new r.type.Term('min_list', [
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Term('[]', []),
                          ]),
                          new r.type.Var('X'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('min_list', [
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('S'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('min_list', [
                            new r.type.Var('Xs'),
                            new r.type.Var('Y'),
                          ]),
                          new r.type.Term(';', [
                            new r.type.Term(',', [
                              new r.type.Term('=<', [
                                new r.type.Var('X'),
                                new r.type.Var('Y'),
                              ]),
                              new r.type.Term(',', [
                                new r.type.Term('=', [
                                  new r.type.Var('S'),
                                  new r.type.Var('X'),
                                ]),
                                new r.type.Term('!', []),
                              ]),
                            ]),
                            new r.type.Term('=', [
                              new r.type.Var('S'),
                              new r.type.Var('Y'),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'prod_list/2': [
                      new r.type.Rule(
                        new r.type.Term('prod_list', [
                          new r.type.Term('[]', []),
                          new r.type.Num(1, !1),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('prod_list', [
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('S'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('prod_list', [
                            new r.type.Var('Xs'),
                            new r.type.Var('Y'),
                          ]),
                          new r.type.Term('is', [
                            new r.type.Var('S'),
                            new r.type.Term('*', [
                              new r.type.Var('X'),
                              new r.type.Var('Y'),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'last/2': [
                      new r.type.Rule(
                        new r.type.Term('last', [
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Term('[]', []),
                          ]),
                          new r.type.Var('X'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('last', [
                          new r.type.Term('.', [
                            new r.type.Var('_'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('X'),
                        ]),
                        new r.type.Term('last', [
                          new r.type.Var('Xs'),
                          new r.type.Var('X'),
                        ]),
                      ),
                    ],
                    'prefix/2': [
                      new r.type.Rule(
                        new r.type.Term('prefix', [
                          new r.type.Var('Part'),
                          new r.type.Var('Whole'),
                        ]),
                        new r.type.Term('append', [
                          new r.type.Var('Part'),
                          new r.type.Var('_'),
                          new r.type.Var('Whole'),
                        ]),
                      ),
                    ],
                    'nth0/3': [
                      new r.type.Rule(
                        new r.type.Term('nth0', [
                          new r.type.Var('X'),
                          new r.type.Var('Y'),
                          new r.type.Var('Z'),
                        ]),
                        new r.type.Term(';', [
                          new r.type.Term('->', [
                            new r.type.Term('var', [new r.type.Var('X')]),
                            new r.type.Term('nth', [
                              new r.type.Num(0, !1),
                              new r.type.Var('X'),
                              new r.type.Var('Y'),
                              new r.type.Var('Z'),
                              new r.type.Var('_'),
                            ]),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('>=', [
                              new r.type.Var('X'),
                              new r.type.Num(0, !1),
                            ]),
                            new r.type.Term(',', [
                              new r.type.Term('nth', [
                                new r.type.Num(0, !1),
                                new r.type.Var('X'),
                                new r.type.Var('Y'),
                                new r.type.Var('Z'),
                                new r.type.Var('_'),
                              ]),
                              new r.type.Term('!', []),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'nth1/3': [
                      new r.type.Rule(
                        new r.type.Term('nth1', [
                          new r.type.Var('X'),
                          new r.type.Var('Y'),
                          new r.type.Var('Z'),
                        ]),
                        new r.type.Term(';', [
                          new r.type.Term('->', [
                            new r.type.Term('var', [new r.type.Var('X')]),
                            new r.type.Term('nth', [
                              new r.type.Num(1, !1),
                              new r.type.Var('X'),
                              new r.type.Var('Y'),
                              new r.type.Var('Z'),
                              new r.type.Var('_'),
                            ]),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('>', [
                              new r.type.Var('X'),
                              new r.type.Num(0, !1),
                            ]),
                            new r.type.Term(',', [
                              new r.type.Term('nth', [
                                new r.type.Num(1, !1),
                                new r.type.Var('X'),
                                new r.type.Var('Y'),
                                new r.type.Var('Z'),
                                new r.type.Var('_'),
                              ]),
                              new r.type.Term('!', []),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'nth0/4': [
                      new r.type.Rule(
                        new r.type.Term('nth0', [
                          new r.type.Var('X'),
                          new r.type.Var('Y'),
                          new r.type.Var('Z'),
                          new r.type.Var('W'),
                        ]),
                        new r.type.Term(';', [
                          new r.type.Term('->', [
                            new r.type.Term('var', [new r.type.Var('X')]),
                            new r.type.Term('nth', [
                              new r.type.Num(0, !1),
                              new r.type.Var('X'),
                              new r.type.Var('Y'),
                              new r.type.Var('Z'),
                              new r.type.Var('W'),
                            ]),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('>=', [
                              new r.type.Var('X'),
                              new r.type.Num(0, !1),
                            ]),
                            new r.type.Term(',', [
                              new r.type.Term('nth', [
                                new r.type.Num(0, !1),
                                new r.type.Var('X'),
                                new r.type.Var('Y'),
                                new r.type.Var('Z'),
                                new r.type.Var('W'),
                              ]),
                              new r.type.Term('!', []),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'nth1/4': [
                      new r.type.Rule(
                        new r.type.Term('nth1', [
                          new r.type.Var('X'),
                          new r.type.Var('Y'),
                          new r.type.Var('Z'),
                          new r.type.Var('W'),
                        ]),
                        new r.type.Term(';', [
                          new r.type.Term('->', [
                            new r.type.Term('var', [new r.type.Var('X')]),
                            new r.type.Term('nth', [
                              new r.type.Num(1, !1),
                              new r.type.Var('X'),
                              new r.type.Var('Y'),
                              new r.type.Var('Z'),
                              new r.type.Var('W'),
                            ]),
                          ]),
                          new r.type.Term(',', [
                            new r.type.Term('>', [
                              new r.type.Var('X'),
                              new r.type.Num(0, !1),
                            ]),
                            new r.type.Term(',', [
                              new r.type.Term('nth', [
                                new r.type.Num(1, !1),
                                new r.type.Var('X'),
                                new r.type.Var('Y'),
                                new r.type.Var('Z'),
                                new r.type.Var('W'),
                              ]),
                              new r.type.Term('!', []),
                            ]),
                          ]),
                        ]),
                      ),
                    ],
                    'nth/5': [
                      new r.type.Rule(
                        new r.type.Term('nth', [
                          new r.type.Var('N'),
                          new r.type.Var('N'),
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('X'),
                          new r.type.Var('Xs'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('nth', [
                          new r.type.Var('N'),
                          new r.type.Var('O'),
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Xs'),
                          ]),
                          new r.type.Var('Y'),
                          new r.type.Term('.', [
                            new r.type.Var('X'),
                            new r.type.Var('Ys'),
                          ]),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('is', [
                            new r.type.Var('M'),
                            new r.type.Term('+', [
                              new r.type.Var('N'),
                              new r.type.Num(1, !1),
                            ]),
                          ]),
                          new r.type.Term('nth', [
                            new r.type.Var('M'),
                            new r.type.Var('O'),
                            new r.type.Var('Xs'),
                            new r.type.Var('Y'),
                            new r.type.Var('Ys'),
                          ]),
                        ]),
                      ),
                    ],
                    'length/2': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1];
                      if (r.type.is_variable(a) || r.type.is_integer(a))
                        if (r.type.is_integer(a) && a.value < 0)
                          e.throw_error(
                            r.error.domain(
                              'not_less_than_zero',
                              a,
                              n.indicator,
                            ),
                          );
                        else {
                          var s = new r.type.Term('length', [
                            i,
                            new r.type.Num(0, !1),
                            a,
                          ]);
                          r.type.is_integer(a) &&
                            (s = new r.type.Term(',', [
                              s,
                              new r.type.Term('!', []),
                            ])),
                            e.prepend([
                              new r.type.State(
                                t.goal.replace(s),
                                t.substitution,
                                t,
                              ),
                            ]);
                        }
                      else
                        e.throw_error(r.error.type('integer', a, n.indicator));
                    },
                    'length/3': [
                      new r.type.Rule(
                        new r.type.Term('length', [
                          new r.type.Term('[]', []),
                          new r.type.Var('N'),
                          new r.type.Var('N'),
                        ]),
                        null,
                      ),
                      new r.type.Rule(
                        new r.type.Term('length', [
                          new r.type.Term('.', [
                            new r.type.Var('_'),
                            new r.type.Var('X'),
                          ]),
                          new r.type.Var('A'),
                          new r.type.Var('N'),
                        ]),
                        new r.type.Term(',', [
                          new r.type.Term('succ', [
                            new r.type.Var('A'),
                            new r.type.Var('B'),
                          ]),
                          new r.type.Term('length', [
                            new r.type.Var('X'),
                            new r.type.Var('B'),
                            new r.type.Var('N'),
                          ]),
                        ]),
                      ),
                    ],
                    'replicate/3': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1],
                        s = n.args[2];
                      if (r.type.is_variable(a))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else if (r.type.is_integer(a))
                        if (a.value < 0)
                          e.throw_error(
                            r.error.domain(
                              'not_less_than_zero',
                              a,
                              n.indicator,
                            ),
                          );
                        else if (r.type.is_variable(s) || r.type.is_list(s)) {
                          for (
                            var o = new r.type.Term('[]'), p = 0;
                            p < a.value;
                            p++
                          )
                            o = new r.type.Term('.', [i, o]);
                          e.prepend([
                            new r.type.State(
                              t.goal.replace(new r.type.Term('=', [o, s])),
                              t.substitution,
                              t,
                            ),
                          ]);
                        } else
                          e.throw_error(r.error.type('list', s, n.indicator));
                      else
                        e.throw_error(r.error.type('integer', a, n.indicator));
                    },
                    'sort/2': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1];
                      if (r.type.is_variable(i))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else if (
                        r.type.is_variable(a) ||
                        r.type.is_fully_list(a)
                      ) {
                        for (var s = [], o = i; './2' === o.indicator; )
                          s.push(o.args[0]), (o = o.args[1]);
                        if (r.type.is_variable(o))
                          e.throw_error(r.error.instantiation(n.indicator));
                        else if (r.type.is_empty_list(o)) {
                          for (
                            var p = s.sort(r.compare), l = p.length - 1;
                            l > 0;
                            l--
                          )
                            p[l].equals(p[l - 1]) && p.splice(l, 1);
                          var u = new r.type.Term('[]');
                          for (l = p.length - 1; l >= 0; l--)
                            u = new r.type.Term('.', [p[l], u]);
                          e.prepend([
                            new r.type.State(
                              t.goal.replace(new r.type.Term('=', [u, a])),
                              t.substitution,
                              t,
                            ),
                          ]);
                        } else
                          e.throw_error(r.error.type('list', i, n.indicator));
                      } else
                        e.throw_error(r.error.type('list', a, n.indicator));
                    },
                    'msort/2': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1];
                      if (r.type.is_variable(i))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else if (
                        r.type.is_variable(a) ||
                        r.type.is_fully_list(a)
                      ) {
                        for (var s = [], o = i; './2' === o.indicator; )
                          s.push(o.args[0]), (o = o.args[1]);
                        if (r.type.is_variable(o))
                          e.throw_error(r.error.instantiation(n.indicator));
                        else if (r.type.is_empty_list(o)) {
                          for (
                            var p = s.sort(r.compare),
                              l = new r.type.Term('[]'),
                              u = p.length - 1;
                            u >= 0;
                            u--
                          )
                            l = new r.type.Term('.', [p[u], l]);
                          e.prepend([
                            new r.type.State(
                              t.goal.replace(new r.type.Term('=', [l, a])),
                              t.substitution,
                              t,
                            ),
                          ]);
                        } else
                          e.throw_error(r.error.type('list', i, n.indicator));
                      } else
                        e.throw_error(r.error.type('list', a, n.indicator));
                    },
                    'keysort/2': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1];
                      if (r.type.is_variable(i))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else if (
                        r.type.is_variable(a) ||
                        r.type.is_fully_list(a)
                      ) {
                        for (var s, o = [], p = i; './2' === p.indicator; ) {
                          if (((s = p.args[0]), r.type.is_variable(s)))
                            return void e.throw_error(
                              r.error.instantiation(n.indicator),
                            );
                          if (!r.type.is_term(s) || '-/2' !== s.indicator)
                            return void e.throw_error(
                              r.error.type('pair', s, n.indicator),
                            );
                          (s.args[0].pair = s.args[1]),
                            o.push(s.args[0]),
                            (p = p.args[1]);
                        }
                        if (r.type.is_variable(p))
                          e.throw_error(r.error.instantiation(n.indicator));
                        else if (r.type.is_empty_list(p)) {
                          for (
                            var l = o.sort(r.compare),
                              u = new r.type.Term('[]'),
                              c = l.length - 1;
                            c >= 0;
                            c--
                          )
                            (u = new r.type.Term('.', [
                              new r.type.Term('-', [l[c], l[c].pair]),
                              u,
                            ])),
                              delete l[c].pair;
                          e.prepend([
                            new r.type.State(
                              t.goal.replace(new r.type.Term('=', [u, a])),
                              t.substitution,
                              t,
                            ),
                          ]);
                        } else
                          e.throw_error(r.error.type('list', i, n.indicator));
                      } else
                        e.throw_error(r.error.type('list', a, n.indicator));
                    },
                    'take/3': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1],
                        s = n.args[2];
                      if (r.type.is_variable(a) || r.type.is_variable(i))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else if (r.type.is_list(a))
                        if (r.type.is_integer(i))
                          if (r.type.is_variable(s) || r.type.is_list(s)) {
                            for (
                              var o = i.value, p = [], l = a;
                              o > 0 && './2' === l.indicator;

                            )
                              p.push(l.args[0]), (l = l.args[1]), o--;
                            if (0 === o) {
                              var u = new r.type.Term('[]');
                              for (o = p.length - 1; o >= 0; o--)
                                u = new r.type.Term('.', [p[o], u]);
                              e.prepend([
                                new r.type.State(
                                  t.goal.replace(new r.type.Term('=', [u, s])),
                                  t.substitution,
                                  t,
                                ),
                              ]);
                            }
                          } else
                            e.throw_error(r.error.type('list', s, n.indicator));
                        else
                          e.throw_error(
                            r.error.type('integer', i, n.indicator),
                          );
                      else e.throw_error(r.error.type('list', a, n.indicator));
                    },
                    'drop/3': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1],
                        s = n.args[2];
                      if (r.type.is_variable(a) || r.type.is_variable(i))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else if (r.type.is_list(a))
                        if (r.type.is_integer(i))
                          if (r.type.is_variable(s) || r.type.is_list(s)) {
                            for (
                              var o = i.value, p = [], l = a;
                              o > 0 && './2' === l.indicator;

                            )
                              p.push(l.args[0]), (l = l.args[1]), o--;
                            0 === o &&
                              e.prepend([
                                new r.type.State(
                                  t.goal.replace(new r.type.Term('=', [l, s])),
                                  t.substitution,
                                  t,
                                ),
                              ]);
                          } else
                            e.throw_error(r.error.type('list', s, n.indicator));
                        else
                          e.throw_error(
                            r.error.type('integer', i, n.indicator),
                          );
                      else e.throw_error(r.error.type('list', a, n.indicator));
                    },
                    'reverse/2': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1],
                        s = r.type.is_instantiated_list(i),
                        o = r.type.is_instantiated_list(a);
                      if (r.type.is_variable(i) && r.type.is_variable(a))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else if (r.type.is_variable(i) || r.type.is_fully_list(i))
                        if (r.type.is_variable(a) || r.type.is_fully_list(a))
                          if (s || o) {
                            for (
                              var p = s ? i : a, l = new r.type.Term('[]', []);
                              './2' === p.indicator;

                            )
                              (l = new r.type.Term('.', [p.args[0], l])),
                                (p = p.args[1]);
                            e.prepend([
                              new r.type.State(
                                t.goal.replace(
                                  new r.type.Term('=', [l, s ? a : i]),
                                ),
                                t.substitution,
                                t,
                              ),
                            ]);
                          } else
                            e.throw_error(r.error.instantiation(n.indicator));
                        else
                          e.throw_error(r.error.type('list', a, n.indicator));
                      else e.throw_error(r.error.type('list', i, n.indicator));
                    },
                    'list_to_set/2': function (e, t, n) {
                      var i = n.args[0],
                        a = n.args[1];
                      if (r.type.is_variable(i))
                        e.throw_error(r.error.instantiation(n.indicator));
                      else {
                        for (var s = i, o = []; './2' === s.indicator; )
                          o.push(s.args[0]), (s = s.args[1]);
                        if (r.type.is_variable(s))
                          e.throw_error(r.error.instantiation(n.indicator));
                        else if (r.type.is_term(s) && '[]/0' === s.indicator) {
                          for (
                            var p, l = [], u = new r.type.Term('[]', []), c = 0;
                            c < o.length;
                            c++
                          ) {
                            p = !1;
                            for (var y = 0; y < l.length && !p; y++)
                              p = 0 === r.compare(o[c], l[y]);
                            p || l.push(o[c]);
                          }
                          for (c = l.length - 1; c >= 0; c--)
                            u = new r.type.Term('.', [l[c], u]);
                          e.prepend([
                            new r.type.State(
                              t.goal.replace(new r.type.Term('=', [a, u])),
                              t.substitution,
                              t,
                            ),
                          ]);
                        } else
                          e.throw_error(r.error.type('list', i, n.indicator));
                      }
                    },
                  },
                  t,
                );
              };
            })(void 0);
          },
          2594: (e) => {
            'use strict';
            e.exports = require('@yarnpkg/cli');
          },
          966: (e) => {
            'use strict';
            e.exports = require('@yarnpkg/core');
          },
          4688: (e) => {
            'use strict';
            e.exports = require('@yarnpkg/fslib');
          },
          3129: (e) => {
            'use strict';
            e.exports = require('child_process');
          },
          8042: (e) => {
            'use strict';
            e.exports = require('clipanion');
          },
          6417: (e) => {
            'use strict';
            e.exports = require('crypto');
          },
          5747: (e) => {
            'use strict';
            e.exports = require('fs');
          },
          2087: (e) => {
            'use strict';
            e.exports = require('os');
          },
          5622: (e) => {
            'use strict';
            e.exports = require('path');
          },
          2184: (e) => {
            'use strict';
            e.exports = require('vm');
          },
        },
        r = {};
      function t(n) {
        if (r[n]) return r[n].exports;
        var i = (r[n] = { exports: {} });
        return e[n](i, i.exports, t), i.exports;
      }
      return (
        (t.n = (e) => {
          var r = e && e.__esModule ? () => e.default : () => e;
          return t.d(r, { a: r }), r;
        }),
        (t.d = (e, r) => {
          for (var n in r)
            t.o(r, n) &&
              !t.o(e, n) &&
              Object.defineProperty(e, n, { enumerable: !0, get: r[n] });
        }),
        (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
        (t.r = (e) => {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 });
        }),
        t(1023)
      );
    })();
    return plugin;
  },
};
