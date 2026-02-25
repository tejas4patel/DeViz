#!/usr/bin/env bash
set -euo pipefail

# DeViz placeholder page generator
# Run from the repo root:
#   bash scripts/add_deviz_placeholders.sh

ROOT_DIR="$(pwd)"
SRC_DIR="$ROOT_DIR/src"
PAGES_DIR="$SRC_DIR/pages"
AUTH_DIR="$PAGES_DIR/auth"
DASH_DIR="$PAGES_DIR/dashboard"

mkdir -p "$PAGES_DIR" "$AUTH_DIR" "$DASH_DIR" "$ROOT_DIR/scripts"

write_file () {
  local path="$1"
  local content="$2"
  if [ -f "$path" ]; then
    echo "Exists: $path"
  else
    echo "Create: $path"
    cat > "$path" <<'EOF'
EOF
    # replace the file with the provided content safely
    python - <<PY
from pathlib import Path
Path("$path").write_text(r"""$content""", encoding="utf-8")
PY
  fi
}

# Public pages
write_file "$PAGES_DIR/PricingPage.tsx" \
"import { Link } from 'react-router-dom';

export default function PricingPage() {
  return (
    <div className=\"page\">
      <h1>Pricing</h1>
      <p>
        This is a placeholder pricing page. It will explain plans, limits, and what users get at each tier.
      </p>

      <section className=\"card\">
        <h2>Starter</h2>
        <p>For quick experiments and lightweight usage.</p>
        <ul>
          <li>Limited runs per month</li>
          <li>Basic visual story outputs</li>
          <li>Community support</li>
        </ul>
      </section>

      <section className=\"card\">
        <h2>Pro</h2>
        <p>For creators and teams shipping DeViz stories regularly.</p>
        <ul>
          <li>More runs and larger documents</li>
          <li>More output formats</li>
          <li>Priority support</li>
        </ul>
      </section>

      <section className=\"card\">
        <h2>Enterprise</h2>
        <p>For organizations integrating DeViz into production workflows.</p>
        <ul>
          <li>Higher limits and SLAs</li>
          <li>Team roles and auditability</li>
          <li>Integration support</li>
        </ul>
      </section>

      <div style={{ marginTop: 24 }}>
        <Link to=\"/register\" className=\"nav-button primary\">Create an account</Link>
      </div>
    </div>
  );
}
"

write_file "$PAGES_DIR/PrivacyPage.tsx" \
"export default function PrivacyPage() {
  return (
    <div className=\"page\">
      <h1>Privacy Policy</h1>
      <p>
        This is a placeholder privacy policy page. Replace with your real policy before launch.
      </p>
      <h2>What we collect</h2>
      <p>
        Account identifiers, usage telemetry, and uploaded content needed to provide the service.
      </p>
      <h2>How we use data</h2>
      <p>
        To operate DeViz, improve reliability, and support user requested features.
      </p>
      <h2>Data retention</h2>
      <p>
        Define retention windows per plan and provide deletion controls.
      </p>
      <h2>Contact</h2>
      <p>
        Provide a support contact for privacy requests.
      </p>
    </div>
  );
}
"

write_file "$PAGES_DIR/TermsPage.tsx" \
"export default function TermsPage() {
  return (
    <div className=\"page\">
      <h1>Terms of Service</h1>
      <p>
        This is a placeholder terms page. Replace with your real terms before launch.
      </p>
      <h2>Service</h2>
      <p>
        DeViz transforms documents into visual stories and related artifacts.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Users must only upload content they have rights to use and must follow all applicable laws.
      </p>
      <h2>Availability</h2>
      <p>
        Define uptime targets, maintenance windows, and support expectations per plan.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        Add standard limitation language appropriate for your business.
      </p>
    </div>
  );
}
"

write_file "$PAGES_DIR/ExamplesGalleryPage.tsx" \
"import { Link } from 'react-router-dom';

const examples = [
  { title: 'Research article to storyboard', caption: 'Turns dense sections into a guided visual narrative.' },
  { title: 'Policy memo to explainer flow', caption: 'Highlights key decisions, tradeoffs, and consequences.' },
  { title: 'Technical spec to diagram set', caption: 'Extracts entities, steps, and dependencies into visuals.' },
];

export default function ExamplesGalleryPage() {
  return (
    <div className=\"page\">
      <h1>Examples</h1>
      <p>
        This page will showcase before and after transformations with short explanations of what DeViz extracted.
      </p>

      <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
        {examples.map((ex) => (
          <div key={ex.title} className=\"card\">
            <h2 style={{ marginTop: 0 }}>{ex.title}</h2>
            <p>{ex.caption}</p>
            <p style={{ opacity: 0.8 }}>
              Placeholder: add input excerpt, visual output preview, and a short note about structure decisions.
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <Link to=\"/demo\" className=\"nav-button primary\">Try the demo</Link>
      </div>
    </div>
  );
}
"

write_file "$PAGES_DIR/ContactPage.tsx" \
"export default function ContactPage() {
  return (
    <div className=\"page\">
      <h1>Contact</h1>
      <p>
        This is a placeholder contact page. Add a form and a support address.
      </p>

      <div className=\"card\">
        <h2>General inquiries</h2>
        <p>Placeholder: contact form fields for name, email, and message.</p>
      </div>

      <div className=\"card\" style={{ marginTop: 16 }}>
        <h2>Support</h2>
        <p>Placeholder: support email and response time expectations.</p>
      </div>
    </div>
  );
}
"

write_file "$PAGES_DIR/NotFoundPage.tsx" \
"import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className=\"page\">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <div style={{ marginTop: 16 }}>
        <Link to=\"/\" className=\"nav-button primary\">Go to home</Link>
      </div>
    </div>
  );
}
"

# Auth integration pages
write_file "$AUTH_DIR/AuthCallbackPage.tsx" \
"import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for Azure auth callback handling.
    // Later: parse tokens, store session, hydrate user profile, then redirect.
    const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 600);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className=\"page\">
      <h1>Signing you in</h1>
      <p>Completing authentication and preparing your workspace.</p>
      <p style={{ opacity: 0.8 }}>
        Placeholder: integrate MSAL or your chosen Azure auth library here.
      </p>
    </div>
  );
}
"

write_file "$AUTH_DIR/LogoutPage.tsx" \
"import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder: clear local session, then redirect to Azure logout if needed.
    const timer = setTimeout(() => navigate('/signed-out', { replace: true }), 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className=\"page\">
      <h1>Signing you out</h1>
      <p>Ending your session.</p>
    </div>
  );
}
"

write_file "$AUTH_DIR/SignedOutPage.tsx" \
"import { Link } from 'react-router-dom';

export default function SignedOutPage() {
  return (
    <div className=\"page\">
      <h1>You are signed out</h1>
      <p>Thanks for using DeViz.</p>
      <div style={{ marginTop: 16 }}>
        <Link to=\"/\" className=\"nav-button primary\">Return home</Link>
      </div>
    </div>
  );
}
"

write_file "$AUTH_DIR/AccessDeniedPage.tsx" \
"import { Link } from 'react-router-dom';

export default function AccessDeniedPage() {
  return (
    <div className=\"page\">
      <h1>Access denied</h1>
      <p>
        Your account is signed in, but it does not have permission to view this page.
      </p>
      <p style={{ opacity: 0.8 }}>
        Placeholder: add guidance for requesting access, tenant restrictions, or role requirements.
      </p>
      <div style={{ marginTop: 16 }}>
        <Link to=\"/\" className=\"nav-button primary\">Go to home</Link>
      </div>
    </div>
  );
}
"

# Dashboard pages
write_file "$DASH_DIR/RunsPage.tsx" \
"import { Link } from 'react-router-dom';

const mockRuns = [
  { id: 'run_001', status: 'Complete', updated: 'Recently' },
  { id: 'run_002', status: 'Processing', updated: 'Recently' },
  { id: 'run_003', status: 'Failed', updated: 'Recently' },
];

export default function RunsPage() {
  return (
    <div className=\"page\">
      <h1>Runs</h1>
      <p>
        This page will list workflow executions, their status, and links to outputs.
      </p>

      <div className=\"card\">
        <h2>Recent runs</h2>
        <ul>
          {mockRuns.map((r) => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <Link to={`/dashboard/runs/${r.id}`}>{r.id}</Link>
              <span style={{ marginLeft: 8, opacity: 0.8 }}>{r.status}</span>
              <span style={{ marginLeft: 8, opacity: 0.6 }}>{r.updated}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to=\"/dashboard/upload\" className=\"nav-button primary\">Start a new run</Link>
      </div>
    </div>
  );
}
"

write_file "$DASH_DIR/RunDetailPage.tsx" \
"import { Link, useParams } from 'react-router-dom';

export default function RunDetailPage() {
  const { runId } = useParams();

  return (
    <div className=\"page\">
      <h1>Run details</h1>
      <p style={{ opacity: 0.8 }}>Run ID: {runId}</p>

      <div className=\"card\">
        <h2>Status</h2>
        <p>Placeholder: status, timestamps, and progress indicators.</p>
      </div>

      <div className=\"card\" style={{ marginTop: 16 }}>
        <h2>Artifacts</h2>
        <p>Placeholder: generated story, visuals, exports, and links.</p>
        <p>
          Example link:
          <span style={{ marginLeft: 8 }}>
            <Link to=\"/dashboard/story/example_story_id\">Open story viewer</Link>
          </span>
        </p>
      </div>

      <div className=\"card\" style={{ marginTop: 16 }}>
        <h2>Logs</h2>
        <p>Placeholder: step logs, warnings, and errors for troubleshooting.</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to=\"/dashboard/runs\" className=\"nav-button secondary\">Back to runs</Link>
      </div>
    </div>
  );
}
"

write_file "$DASH_DIR/SettingsPage.tsx" \
"export default function SettingsPage() {
  return (
    <div className=\"page\">
      <h1>Settings</h1>
      <p>
        This page will hold account and workspace preferences.
      </p>

      <div className=\"card\">
        <h2>Profile</h2>
        <p>Placeholder: name, email, and profile settings.</p>
      </div>

      <div className=\"card\" style={{ marginTop: 16 }}>
        <h2>Notifications</h2>
        <p>Placeholder: email notifications for run completion and failures.</p>
      </div>

      <div className=\"card\" style={{ marginTop: 16 }}>
        <h2>Integrations</h2>
        <p>Placeholder: storage, webhooks, and API key management.</p>
      </div>
    </div>
  );
}
"

# Patch App.tsx to add routes and imports
python - <<'PY'
from pathlib import Path
import re

app_path = Path("src/App.tsx")
text = app_path.read_text(encoding="utf-8")

def ensure_import(name: str, path: str):
    global text
    if re.search(rf"import\s+{re.escape(name)}\s+from\s+['\"]{re.escape(path)}['\"];", text):
        return
    # Insert after existing imports block
    lines = text.splitlines()
    insert_at = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            insert_at = i + 1
    lines.insert(insert_at, f"import {name} from '{path}';")
    text = "\n".join(lines) + ("\n" if not text.endswith("\n") else "")

ensure_import("PricingPage", "./pages/PricingPage")
ensure_import("PrivacyPage", "./pages/PrivacyPage")
ensure_import("TermsPage", "./pages/TermsPage")
ensure_import("ExamplesGalleryPage", "./pages/ExamplesGalleryPage")
ensure_import("ContactPage", "./pages/ContactPage")
ensure_import("NotFoundPage", "./pages/NotFoundPage")

ensure_import("AuthCallbackPage", "./pages/auth/AuthCallbackPage")
ensure_import("LogoutPage", "./pages/auth/LogoutPage")
ensure_import("SignedOutPage", "./pages/auth/SignedOutPage")
ensure_import("AccessDeniedPage", "./pages/auth/AccessDeniedPage")

ensure_import("RunsPage", "./pages/dashboard/RunsPage")
ensure_import("RunDetailPage", "./pages/dashboard/RunDetailPage")
ensure_import("SettingsPage", "./pages/dashboard/SettingsPage")

# Add public routes
if "path=\"pricing\"" not in text:
    text = re.sub(
        r"(<Route path=\"/\" element={<Layout />}>[\s\S]*?<Route path=\"demo\" element={<DemoPage />} />)",
        r"\1\n        <Route path=\"pricing\" element={<PricingPage />} />\n        <Route path=\"examples\" element={<ExamplesGalleryPage />} />\n        <Route path=\"contact\" element={<ContactPage />} />\n        <Route path=\"privacy\" element={<PrivacyPage />} />\n        <Route path=\"terms\" element={<TermsPage />} />",
        text,
        count=1
    )

# Add auth integration routes
if "path=\"/auth/callback\"" not in text:
    text = re.sub(
        r"(\{/* Authentication routes *\*/\s*<Route path=\"/login\" element={<LoginPage />} />\s*<Route path=\"/register\" element={<RegisterPage />} />)",
        r"\1\n      <Route path=\"/auth/callback\" element={<AuthCallbackPage />} />\n      <Route path=\"/logout\" element={<LogoutPage />} />\n      <Route path=\"/signed-out\" element={<SignedOutPage />} />\n      <Route path=\"/access-denied\" element={<AccessDeniedPage />} />",
        text,
        count=1
    )

# Add dashboard routes
if "path=\"runs\"" not in text:
    text = re.sub(
        r"(<Route path=\"/dashboard\" element={<Layout authenticated />}>[\s\S]*?<Route path=\"story/:storyId\" element={<StoryViewer />} />)",
        r"\1\n        <Route path=\"runs\" element={<RunsPage />} />\n        <Route path=\"runs/:runId\" element={<RunDetailPage />} />\n        <Route path=\"settings\" element={<SettingsPage />} />",
        text,
        count=1
    )

# Add NotFound route at the end of Routes
if "path=\"*\"" not in text:
    text = re.sub(
        r"(</Route>\s*</Routes>\s*\);)",
        r"</Route>\n\n      <Route path=\"*\" element={<NotFoundPage />} />\n    </Routes>\n  );",
        text,
        count=1
    )

app_path.write_text(text, encoding="utf-8")
print("Patched src/App.tsx")
PY

# Patch Layout.tsx nav links
python - <<'PY'
from pathlib import Path
import re

p = Path("src/components/Layout.tsx")
text = p.read_text(encoding="utf-8")

# Add public nav links if missing
if "to=\"/pricing\"" not in text:
    text = re.sub(
        r"(<Link to=\"/demo\"[\s\S]*?>\s*Demo\s*</Link>\s*)</div>",
        r"\1        <Link to=\"/pricing\" className={currentPath === '/pricing' ? 'nav-link active' : 'nav-link'}>\n          Pricing\n        </Link>\n        <Link to=\"/examples\" className={currentPath === '/examples' ? 'nav-link active' : 'nav-link'}>\n          Examples\n        </Link>\n        <Link to=\"/contact\" className={currentPath === '/contact' ? 'nav-link active' : 'nav-link'}>\n          Contact\n        </Link>\n      </div>",
        text,
        count=1
    )

# Add dashboard nav links if missing
if "to=\"/dashboard/runs\"" not in text:
    text = re.sub(
        r"(<Link to=\"/dashboard/upload\"[\s\S]*?>\s*Upload\s*</Link>\s*)</div>",
        r"\1        <Link to=\"/dashboard/runs\" className={currentPath.startsWith('/dashboard/runs') ? 'nav-link active' : 'nav-link'}>\n          Runs\n        </Link>\n        <Link to=\"/dashboard/settings\" className={currentPath === '/dashboard/settings' ? 'nav-link active' : 'nav-link'}>\n          Settings\n        </Link>\n      </div>",
        text,
        count=1
    )

# Change sign out button to a Link to /logout
text = re.sub(
    r"<button className=\"nav-button secondary\">\s*Sign Out\s*</button>",
    "<Link to=\"/logout\" className=\"nav-button secondary\">Sign Out</Link>",
    text
)

# Add footer links to terms and privacy if missing
if "to=\"/terms\"" not in text or "to=\"/privacy\"" not in text:
    text = re.sub(
        r"(<p>&copy; 2026 DeViz\. Transform documents into engaging stories\.</p>)",
        r"\1\n            <div style={{ marginTop: 8, display: 'flex', gap: 12, justifyContent: 'center' }}>\n              <a href=\"/terms\">Terms</a>\n              <a href=\"/privacy\">Privacy</a>\n            </div>",
        text,
        count=1
    )

p.write_text(text, encoding="utf-8")
print(\"Patched src/components/Layout.tsx\")
PY

echo ""
echo "Done."
echo "Next:"
echo "  npm install"
echo "  npm run dev"