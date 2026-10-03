#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=11,<13", "cairosvg>=2.8,<3"]
# ///
"""Draw PocketShell's original app-aligned topic artwork; run with uv run --script.

All drawings are generated from geometry and bundled fonts. No input artwork,
remote services, or fabricated product screenshots are used.
"""
from pathlib import Path
from io import BytesIO
import cairosvg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
S = 2
PAPER, INK, ORANGE = '#0d1117', '#e6edf3', '#22d3ee'
MUTED, RULE, WHITE = '#8b949e', '#2d333b', '#1c2129'
SURFACE, ON_ACCENT = '#161b22', '#04101a'

def font(size, mono=False, bold=False):
    # Linux system sans is the closest installed equivalent to the app's Segoe UI.
    name = 'DejaVuSansMono.ttf' if mono else ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')
    return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/' + name, int(size*S))

class Plate:
    def __init__(self, number, title, subtitle, description=('Practical guides for your', 'servers and agent sessions.')):
        self.im = Image.new('RGB', (1200*S,630*S), PAPER)
        self.d = ImageDraw.Draw(self.im)
        self.d.rounded_rectangle((32*S,28*S,1168*S,600*S), radius=10*S, fill=SURFACE, outline=RULE, width=S)
        self.line((32,86,1168,86), RULE)
        self.text((55,41), '>_', 22, mono=True, fill=ORANGE)
        self.text((104,45), 'PocketShell', 18, bold=True)
        self.text((836,47), 'FIELD NOTES', 13, mono=True, fill=MUTED)
        self.text((1071,47), number, 14, mono=True, fill=ORANGE)
        self.line((831,85,1139,85), ORANGE,2)
        self.line((32,557,1168,557), RULE)
        self.text((56,574), subtitle.upper(), 12, mono=True, fill=MUTED)
        self.text((1028,574), 'SSH / AI', 12, mono=True, fill=MUTED)
        self.text((64,140), 'REMOTE WORK', 13, mono=True, fill=ORANGE)
        y = 194
        for row in title.split('|'):
            self.text((62,y), row, 43, bold=True)
            y += 54
        self.text((64,465), description[0], 19, fill=MUTED)
        self.text((64,496), description[1], 19, fill=MUTED)
        self.line((568,110,568,530), RULE)
    def text(self, xy, value, size=18, mono=False, bold=False, fill=INK):
        self.d.text(tuple(v*S for v in xy),value,font=font(size,mono,bold),fill=fill)
    def line(self, points, fill=INK, width=1):
        self.d.line(tuple(v*S for v in points), fill=fill, width=width*S)
    def box(self, rect, fill=None, outline=INK, width=1):
        self.d.rectangle(tuple(v*S for v in rect),fill=fill,outline=outline,width=width*S)
    def circle(self, x,y,r, fill=None, outline=INK, width=1):
        self.d.ellipse(((x-r)*S,(y-r)*S,(x+r)*S,(y+r)*S),fill=fill,outline=outline,width=width*S)
    def arrow(self,x1,y1,x2,y2,fill=INK):
        self.line((x1,y1,x2,y2),fill,2)
        if x2 != x1:
            sign=1 if x2>x1 else -1
            self.line((x2-9*sign,y2-5,x2,y2,x2-9*sign,y2+5),fill,2)
        else:
            sign=1 if y2>y1 else -1
            self.line((x2-5,y2-9*sign,x2,y2,x2+5,y2-9*sign),fill,2)
    def label(self,xy,value): self.text(xy,value,14,mono=True,fill=MUTED)
    def save(self, path, webp=True):
        out=self.im.resize((1200,630),Image.Resampling.LANCZOS)
        target=ROOT/path
        target.parent.mkdir(parents=True,exist_ok=True)
        out.save(target.with_suffix('.png'),optimize=True)
        if webp: out.save(target.with_suffix('.webp'),quality=92,method=6)
        return out

def config(p):
    p.label((620,112),'01 / ALIASES → CONNECTIONS')
    p.text((620,170),'$ ssh staging',28,mono=True,fill=ORANGE)
    p.arrow(650,220,650,265,ORANGE)
    for y,key,val in [(287,'Host','staging'),(340,'HostName','10.0.4.17'),(393,'User','deploy'),(446,'IdentityFile','~/.ssh/work')]:
        p.line((620,y-14,1125,y-14),RULE)
        p.text((620,y),key,19,mono=True)
        p.text((810,y),val,19,mono=True,fill=ORANGE)
    p.line((620,498,1125,498),INK)

def keepalive(p):
    p.label((620,112),'02 / A CONNECTION WITH A PULSE')
    for x,label in [(646,'CLIENT'),(1050,'SERVER')]:
        p.line((x,181,x,462),INK,2); p.label((x-20,486),label)
    for y,time in [(218,'00:00'),(306,'00:30'),(394,'01:00')]:
        p.arrow(650,y,1045,y,ORANGE)
        p.text((794,y-29),time,18,mono=True,fill=ORANGE)
        p.arrow(1045,y+28,650,y+28)
    p.text((716,514),'ServerAliveInterval 30',18,mono=True)

def keys(p):
    p.label((620,112),'03 / TRUST, ONE KEY AT A TIME')
    p.circle(711,235,46,outline=ORANGE,width=3)
    p.circle(711,235,17,outline=ORANGE,width=3)
    p.line((757,235,997,235,997,259,965,259,965,235),ORANGE,4)
    p.line((913,235,913,259,880,259,880,235),ORANGE,4)
    p.label((657,312),'ed25519 / PUBLIC KEY')
    p.line((620,355,1125,355),INK)
    for y,n,text in [(378,'01','Generate a key'),(427,'02','Install the public half'),(476,'03','Restrict access')]:
        p.text((620,y),n,18,mono=True,fill=ORANGE); p.text((675,y),text,22)

def tmux(p):
    p.label((620,112),'04 / THE PROCESS KEEPS RUNNING')
    p.line((626,213,1126,213),ORANGE,3)
    p.text((670,176),'SERVER / tmux session',20,mono=True)
    for x in range(640,1120,40): p.line((x,210,x,216),ORANGE,3)
    p.line((661,218,661,311),INK,2); p.line((1054,218,1054,311),INK,2)
    p.box((620,315,817,382),WHITE); p.text((641,338),'attached',21,mono=True)
    p.box((917,315,1126,382),WHITE); p.text((939,338),'reattached',21,mono=True)
    p.line((826,350,907,350),RULE,2)
    p.line((852,335,879,365),ORANGE,3); p.line((879,335,852,365),ORANGE,3)
    p.label((772,425),'NETWORK DISCONNECTS')
    p.text((653,484),'Work survives the gap.',27,bold=True)

def forwarding(p):
    p.label((620,112),'05 / FORWARD TRUST CAREFULLY')
    for x,label in [(675,'LOCAL'),(867,'BASTION'),(1060,'TARGET')]:
        p.circle(x,244,36,fill=ORANGE if x==675 else None)
        p.label((x-30,304),label)
    p.arrow(715,244,824,244); p.arrow(907,244,1017,244)
    p.line((675,385,1060,385),ORANGE,2)
    p.line((675,376,675,394),ORANGE,2); p.line((1060,376,1060,394),ORANGE,2)
    p.text((737,415),'ProxyJump',29,mono=True,fill=ORANGE)
    p.label((713,473),'A DIRECT PATH TO THE TARGET')

def remote(p):
    p.label((620,112),'06 / PREPARE A REMOTE WORKSPACE')
    for y,n,label,detail in [(174,'01','Connect','ssh workbox'),(288,'02','Isolate','a dedicated user'),(402,'03','Persist','named agent sessions')]:
        p.text((620,y),n,43,mono=True,fill=ORANGE)
        p.text((711,y),label,29,bold=True)
        p.text((712,y+43),detail,17,mono=True)
        p.line((620,y+87,1125,y+87),RULE)

def manage(p):
    p.label((620,112),'07 / A SESSION HAS A LIFECYCLE')
    for y,n,label in [(178,'01','LIST'),(272,'02','ATTACH'),(366,'03','READ'),(460,'04','RESPOND')]:
        p.circle(644,y+16,24,fill=ORANGE,outline=ORANGE)
        p.text((632,y+4),n,17,mono=True,fill=ON_ACCENT)
        p.text((700,y),label,27,mono=True)
        if y<460: p.arrow(644,y+43,644,y+68)
        p.line((700,y+54,1110,y+54),RULE)

def multiplexer(p):
    p.label((620,112),'08 / ONE WORKSPACE, NAMED SESSIONS')
    p.text((620,177),'aplexer',47,bold=True)
    p.line((631,252,631,472),ORANGE,2)
    for y,name,tag in [(290,'claude','backend'),(380,'codex','tests'),(470,'gemini','review')]:
        p.arrow(631,y,705,y,ORANGE)
        p.text((733,y-25),name,28,mono=True)
        p.text((734,y+10),tag,15,mono=True,fill=MUTED)
        p.line((732,y+40,1119,y+40),RULE)

def phone(p):
    p.label((620,112),'09 / READ THE STATE. SEND THE INPUT.')
    p.text((622,177),'$ t status',25,mono=True,fill=ORANGE)
    for y,name,state in [(247,'api','running'),(305,'tests','waiting'),(363,'docs','done')]:
        p.line((620,y-12,1124,y-12),RULE)
        p.text((620,y),name,22,mono=True)
        p.text((895,y),state,22,mono=True,fill=ORANGE if state=='waiting' else INK)
    p.line((620,415,1124,415),INK)
    p.text((620,457),'A quick check.',35,bold=True)
    p.text((620,499),'Then back to your day.',23)

def mobile(p):
    p.label((620,112),'10 / CHOOSE YOUR CONNECTION')
    for y,n,title,detail in [(177,'A','SSH client','Keys + a terminal'),(297,'B','Mosh','Changing networks'),(417,'C','Browser','No install needed')]:
        p.text((620,y),n,47,mono=True,fill=ORANGE)
        p.text((700,y),title,29,bold=True)
        p.text((700,y+44),detail,18,mono=True,fill=MUTED)
        p.line((620,y+95,1124,y+95),RULE)

def parallel(p):
    p.label((620,112),'11 / SEPARATE BRANCHES, SHARED GOAL')
    p.circle(650,318,12,fill=INK)
    for y,name in [(208,'feature'),(318,'tests'),(428,'docs')]:
        p.line((665,318,717,318,717,y,782,y),INK,2)
        p.arrow(781,y,1108,y,ORANGE)
        p.text((803,y-40),name,24,mono=True)
        p.circle(826,y,7,fill=ORANGE,outline=ORANGE)
        p.circle(951,y,7,fill=ORANGE,outline=ORANGE)
    p.text((706,497),'One worktree per task.',23)

def crash(p):
    p.label((620,112),'12 / FAILURE STAYS VISIBLE')
    p.text((620,177),'SESSION / STATUS',18,mono=True,fill=MUTED)
    p.line((620,220,1124,220),INK)
    p.text((620,249),'api',26,mono=True); p.text((906,249),'running',23,mono=True)
    p.box((607,303,1136,379),fill='#f59e0b',outline='#f59e0b')
    p.text((624,326),'tests',26,mono=True,fill=ON_ACCENT); p.text((906,326),'dead !',23,mono=True,fill=ON_ACCENT)
    p.text((620,405),'docs',26,mono=True); p.text((906,405),'running',23,mono=True)
    p.arrow(1080,383,1080,473,'#f59e0b')
    p.text((620,490),'Read. Acknowledge. Restart.',21)

ARTICLES = [
('ssh-config-file','01','The SSH|config file.','HOST ALIASES / KEYS / CONNECTIONS',config),
('keep-ssh-session-alive','02','Keep SSH|sessions alive.','KEEPALIVES / TMUX / MOSH',keepalive),
('ssh-authorized-keys-hardening','03','SSH keys|and server|hardening.','SSH KEYS / SETUP / HARDENING',keys),
('tmux-persistent-ssh-sessions','04','Persistent|SSH sessions|with tmux.','PERSISTENT SESSIONS / TMUX',tmux),
('ssh-agent-forwarding','05','SSH agent|forwarding.','AGENT FORWARDING / SAFER PATHS',forwarding),
('ssh-ai-agents-remote-machines','06','Run AI agents|on a remote|machine.','REMOTE MACHINES / AI AGENTS',remote),
('manage-ai-agents-over-ssh','07','Manage your|agents|over SSH.','DAY TWO / REMOTE AGENT OPERATIONS',manage),
('aplexer-agent-multiplexer','08','aplexer:|named agent|sessions.','APLEXER / AN AGENT MULTIPLEXER',multiplexer),
('check-ai-agents-from-phone','09','Check agents|from your|phone.','MOBILE ACCESS / REMOTE AGENTS',phone),
('ssh-from-ipad-iphone','10','SSH from|an iPad|or iPhone.','SSH / IPAD / IPHONE',mobile),
('multiple-ai-coding-agents','11','Run multiple|AI agents|in parallel.','PARALLEL WORK / GIT WORKTREES',parallel),
('aplexer-crash-warnings','12','When an|agent crashes.','APLEXER / CRASH WARNINGS',crash),
]

def generate_features():
    """Write compact 720×400 feature diagrams with technical footer captions."""
    common = '''<svg xmlns="http://www.w3.org/2000/svg" width="720" height="400" viewBox="0 0 720 400" role="img" aria-labelledby="title desc">
<title>{title}</title><desc>{desc}</desc>
<defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="none" stroke="#22d3ee"/></marker></defs>
<style>text{{font-family:Segoe UI,Arial,sans-serif;fill:#e6edf3;font-size:17px}}.mono{{font-family:Consolas,DejaVu Sans Mono,monospace;font-size:14px}}.meta{{fill:#8b949e;font-size:12px;letter-spacing:.4px}}.cyan{{fill:#22d3ee}}.rule{{stroke:#2d333b;fill:none}}.link{{stroke:#22d3ee;fill:none;stroke-width:2;marker-end:url(#arrow)}}</style>
<rect width="720" height="400" fill="#0d1117"/><rect x="16" y="16" width="688" height="368" rx="10" fill="#161b22" stroke="#2d333b"/>
<path d="M16 66H704M16 344H704" class="rule"/><text x="36" y="47" class="mono cyan">&gt;_</text><text x="79" y="46">{heading}</text><text x="36" y="368" class="mono meta">{footer}</text>
{body}</svg>'''
    features = {
        'host-sync': {
            'title':'Host details encrypted locally before synchronization',
            'desc':'Three saved host rows connect to an encrypted data block. The illustrated sync arrow carries ciphertext.',
            'heading':'Saved hosts', 'footer':'LOCAL ENCRYPTION → CIPHERTEXT SYNC',
            'body': '''<text x="40" y="103" class="mono meta">ON YOUR DEVICE</text><text x="410" y="103" class="mono meta">ENCRYPTED HOST DATA</text>
<rect x="36" y="123" width="269" height="168" rx="6" fill="#0d1117" stroke="#2d333b"/>
<rect x="37" y="124" width="267" height="55" fill="#22d3ee" fill-opacity=".12"/><path d="M36 179H305M36 235H305" class="rule"/>
<circle cx="57" cy="151" r="4" fill="#22d3ee"/><text x="73" y="157">workbox</text><text x="73" y="213">staging</text><text x="73" y="269">build-server</text>
<path d="M316 207H389" class="link"/><text x="331" y="188" class="mono meta">encrypt</text>
<rect x="409" y="123" width="271" height="168" rx="6" fill="#1c2129" stroke="#0891b2"/>
<text x="430" y="157" class="mono cyan">encrypted payload</text><text x="430" y="195" class="mono meta">8f 2a 91 b7 d0 4c</text><text x="430" y="224" class="mono meta">6e c3 08 72 a5 9d</text><path d="M430 249H622" class="link"/><text x="430" y="276" class="mono">sync as ciphertext</text>''',
        },
        'agent-session': {
            'title':'An agent session persists across disconnected client connections',
            'desc':'A continuous server-side aplexer session runs above a client timeline showing attach, disconnect, and reattach.',
            'heading':'Agent session', 'footer':'SERVER SESSION / CLIENT ATTACHMENTS',
            'body': '''<text x="40" y="102" class="mono meta">ON THE SERVER</text>
<rect x="36" y="118" width="648" height="78" rx="6" fill="#0d1117" stroke="#2d333b"/><circle cx="61" cy="145" r="4" fill="#3fb950"/><text x="77" y="150" class="mono">aplexer / backend</text><text x="557" y="150" class="mono meta">running</text>
<path d="M61 176H659" stroke="#22d3ee" stroke-width="2"/><path d="M61 172V180M181 172V180M301 172V180M421 172V180M541 172V180M659 172V180" stroke="#22d3ee"/>
<text x="40" y="228" class="mono meta">YOUR CONNECTION</text>
<path d="M61 263H659" class="rule"/><path d="M130 196V254M590 196V254" stroke="#22d3ee" stroke-dasharray="4 5"/>
<circle cx="130" cy="263" r="7" fill="#22d3ee"/><circle cx="360" cy="263" r="7" fill="#161b22" stroke="#8b949e"/><circle cx="590" cy="263" r="7" fill="#22d3ee"/>
<text x="96" y="299" class="mono">attach</text><text x="307" y="299" class="mono meta">disconnect</text><text x="550" y="299" class="mono">reattach</text>''',
        },
        'browser-terminal': {
            'title':'A terminal session accessed through a browser tab',
            'desc':'An illustrated browser tab contains a connected SSH terminal with a remote command prompt.',
            'heading':'Browser terminal', 'footer':'BROWSER TAB / REMOTE SSH SESSION',
            'body': '''<rect x="36" y="91" width="648" height="230" rx="6" fill="#0c0c0c" stroke="#2d333b"/>
<path d="M37 131H683" class="rule"/><path d="M53 130H252" stroke="#22d3ee" stroke-width="2"/>
<text x="54" y="117" class="mono">workbox / main</text><text x="274" y="117" class="mono meta">+</text><text x="458" y="117" class="mono meta">app.pocketshell.io</text>
<text x="57" y="169" class="mono meta">Connected to workbox over SSH</text><text x="57" y="211" class="mono cyan">alexey@workbox:~/project $</text>
<text x="57" y="245" class="mono">git status --short</text><text x="57" y="279" class="mono"> M src/main.py</text><rect x="57" y="297" width="8" height="13" fill="#22d3ee"/>''',
        },
    }
    folder=ROOT/'images/features'
    folder.mkdir(parents=True,exist_ok=True)
    for slug,values in features.items():
        source=common.format(**values)
        (folder/f'{slug}.svg').write_text(source)
        raster=cairosvg.svg2png(bytestring=source.encode(),output_width=1440,output_height=800)
        im=Image.open(BytesIO(raster)).convert('RGB').resize((720,400),Image.Resampling.LANCZOS)
        im.save(folder/f'{slug}.webp',quality=94,method=6)


def main():
    generate_features()
    sheets=[]
    for slug,num,title,subtitle,draw in ARTICLES:
        p=Plate(num,title,subtitle); draw(p)
        sheets.append(p.save(Path('images/blog')/slug))
    p=Plate('00','Your servers.|Within reach.','SSH / FILES / AGENTS / POCKETSHELL', ('A workspace for your servers', 'and remote agent sessions.'))
    multiplexer(p)
    p.save(Path('images/landing-agents'))
    p=Plate('00','Your servers.|Within reach.','POCKETSHELL / A WORKSPACE FOR REMOTE WORK', ('A workspace for your servers', 'and remote agent sessions.'))
    p.label((620,112),'SSH / FILES / AGENTS')
    p.text((620,200),'pocketshell',51,bold=True)
    p.line((620,296,1124,296),ORANGE,4)
    p.text((620,330),'Connect to your machines.',26)
    p.text((620,375),'Pick up your work.',26)
    p.text((620,476),'pocketshell.io',23,mono=True,fill=ORANGE)
    p.save(Path('images/og-cover'),webp=False)
    sheet=Image.new('RGB',(1800,1260),PAPER)
    for i,im in enumerate(sheets):
        sheet.paste(im.resize((600,315),Image.Resampling.LANCZOS),((i%3)*600,(i//3)*315))
    evidence=ROOT/'.tmp/design/editorial-image-contact-sheet.png'
    evidence.parent.mkdir(parents=True,exist_ok=True)
    sheet.save(evidence)
    print('Generated 27 raster assets, 3 feature SVG/WebP pairs, and review sheet.')

if __name__=='__main__':
    import argparse
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--features-only', action='store_true', help='Regenerate only the three feature SVG/WebP pairs')
    args = parser.parse_args()
    if args.features_only:
        generate_features()
        print('Generated 3 feature SVG/WebP pairs.')
    else:
        main()
