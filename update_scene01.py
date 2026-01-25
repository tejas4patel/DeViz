import os

file_path = 'src/story/scenes/Scene01Pillars.tsx'
with open(file_path, 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
data_block_replaced = False

start_marker = "  const data = useMemo(() => {"
end_marker = "  }, []);"

for line in lines:
    if start_marker in line:
        skip = True
        new_lines.append(line) # Keep the start line? No, I want to replace the whole block
        # Actually I want to replace the whole block with the new implementation
        # The new implementation is:
        new_lines.append("  const data = useMemo(() => {\n")
        new_lines.append("    // Clone to ensure D3 simulation doesn't mutate original data across re-renders\n")
        new_lines.append("    const nodes = scene01Nodes.map(n => ({ ...n }));\n")
        new_lines.append("    const links = scene01Links.map(l => ({ ...l }));\n")
        new_lines.append("    return { nodes, links };\n")
        new_lines.append("  }, []);\n")
        data_block_replaced = True
        continue
    
    if skip:
        if end_marker in line:
            skip = False
        continue
    
    new_lines.append(line)

with open(file_path, 'w') as f:
    f.writelines(new_lines)

print("Updated file.")
